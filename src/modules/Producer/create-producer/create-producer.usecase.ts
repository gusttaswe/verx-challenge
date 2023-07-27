import { Injectable } from '@nestjs/common'
import { Ok, Err, Result } from 'neverthrow'

// Repositories
import { IProducerRepository } from 'repositories/producer/producer.contract'
import { IAddressRepository } from 'repositories/address/address.contract'
import { IFarmRepository } from 'repositories/farm/farm.contract'
import { ICultureRepository } from 'repositories/culture/culture.contract'

// Module
import { UseCase } from 'shared/core/usecase'
import { CreateProducerError } from './create-producer.error'

// Interfaces & Types
import { CreateProducerInput, CreateProducerOutput } from './create-producer.dto'

// Domains
import { Producer } from 'domains/producer.domain'
import { Address } from 'domains/address.domain'
import { Culture } from 'domains/culture.domain'
import { Farm } from 'domains/farm.domain'
import { Document } from 'domains/document.domain'

type CreateProducerResponse = Result<CreateProducerOutput, CreateProducerError>

@Injectable()
export class CreateProducerUseCase
  implements UseCase<CreateProducerInput, CreateProducerOutput, CreateProducerError>
{
  constructor(
    private readonly producerRepository: IProducerRepository,
    private readonly addressRepository: IAddressRepository,
    private readonly farmRepository: IFarmRepository,
    private readonly cultureRepository: ICultureRepository
  ) {}

  public async execute({
    farm: farmInput,
    producer: producerInput
  }: CreateProducerInput): Promise<CreateProducerResponse> {
    const documentOrError = Document.create(producerInput.document)
    if (documentOrError.isErr()) return new Err(CreateProducerError.InvalidDocument())
    const document: Document = documentOrError.value

    const producerExists = await this.producerRepository.getByDocument(document)
    if (producerExists.isOk()) return new Err(CreateProducerError.ProducerAlreadyExists())

    const isAreaInsuficient = Farm.isTotalAreaInsufficient(farmInput)
    if (isAreaInsuficient) return new Err(CreateProducerError.InsufficientFarmArea())

    const producer = new Producer({ ...producerInput, document: document })
    const producerResult = await this.producerRepository.save(producer)
    if (producerResult.isErr()) return new Err(CreateProducerError.UnableToCreateProducer())

    const address = new Address(farmInput.address)
    const addressResult = await this.addressRepository.save(address)
    if (addressResult.isErr()) return new Err(CreateProducerError.UnableToCreateFarmAddress())

    const cultures = farmInput.plantedCultures.map((culture) => new Culture(culture))
    const culturePromises = cultures.map((culture) => this.cultureRepository.save(culture))
    await Promise.all(culturePromises)

    const farm = new Farm({
      name: farmInput.name,
      totalArea: farmInput.totalArea,
      cultivableArea: farmInput.cultivableArea,
      vegetationArea: farmInput.vegetationArea,
      address: address,
      plantedCultures: cultures
    })

    await this.farmRepository.save(farm)

    return new Ok({
      producer,
      farm
    })
  }
}
