import { Injectable } from '@nestjs/common'
import { Ok, Err, Result } from 'neverthrow'

// Repositories
import { IProducerRepository } from 'repositories/producer/producer.contract'
import { ICultureRepository } from 'repositories/culture/culture.contract'

// Module
import { UseCase } from 'shared/core/usecase'
import { CreateProducerError } from './create-producer.error'

// Domain Entities
import { Producer } from 'domains/producer.entity'
import { Farm } from 'domains/farm.entity'
import { Address } from 'domains/address.entity'
import { Document } from 'domains/document.domain'
import { Culture } from 'domains/culture.entity'

// DTOs
import { CreateProducerInput, CreateProducerOutput } from './create-producer.dto'

type CreateProducerResponse = Result<CreateProducerOutput, CreateProducerError>

@Injectable()
export class CreateProducerUseCase
  implements UseCase<CreateProducerInput, CreateProducerOutput, CreateProducerError>
{
  constructor(
    private readonly producerRepository: IProducerRepository,
    private readonly cultureRepository: ICultureRepository
  ) {}

  public async execute(input: CreateProducerInput): Promise<CreateProducerResponse> {
    const documentOrError = Document.create(input.document)
    if (documentOrError.isErr()) return new Err(CreateProducerError.InvalidDocument())
    const document: Document = documentOrError.value

    const producerExists = await this.producerRepository.exists(document)
    if (producerExists) return new Err(CreateProducerError.ProducerAlreadyExists())

    const addressOrError = Address.create(input.farm.address)
    if (addressOrError.isErr()) return new Err(CreateProducerError.InvalidAddress())
    const address: Address = addressOrError.value

    const cultureNames = input.farm.cultures.map((culture) => culture.name)
    const culturePromises = cultureNames.map((name) => this.cultureRepository.getByName(name))
    const cultureResults = await Promise.all(culturePromises)

    const invalidCultureResult = cultureResults.find((result) => result.isErr())
    if (invalidCultureResult) return new Err(CreateProducerError.CultureNotFound())
    const cultures: Culture[] = cultureResults.map((result) => result.isOk() && result.value)

    const farmOrError = Farm.create({
      name: input.farm.name,
      totalArea: input.farm.totalArea,
      cultivableArea: input.farm.cultivableArea,
      vegetationArea: input.farm.vegetationArea,
      address: address,
      cultures: cultures
    })
    if (farmOrError.isErr()) return new Err(CreateProducerError.InsufficientFarmArea())
    const farm: Farm = farmOrError.value

    const producerOrError = Producer.create({
      document: document,
      name: input.name,
      farms: [farm]
    })
    if (producerOrError.isErr()) return new Err(CreateProducerError.InvalidProducer())
    const producer: Producer = producerOrError.value

    const producerResult = await this.producerRepository.save(producer)
    if (producerResult.isErr()) return new Err(CreateProducerError.UnableToCreateProducer())

    return new Ok(producer)
  }
}
