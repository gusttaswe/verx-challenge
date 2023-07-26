import { Injectable } from '@nestjs/common'
import { Ok, Err, Result } from 'neverthrow'

// Repositories
import { IProducerRepository } from 'repositories/producer/producer.contract'

// UseCase
import { UseCase } from 'shared/core/usecase'

// Interfaces & Types
import {
  CreateProducerInput,
  CreateProducerOutput
} from './create-producer.dto'

// Domains
import { Producer } from 'domains/producer.domain'
import { IAddressRepository } from 'repositories/address/address.contract'
import { IFarmRepository } from 'repositories/farm/farm.contract'
import { ICultureRepository } from 'repositories/culture/culture.contract'
import { Address } from 'domains/address.domain'
import { Culture } from 'domains/culture.domain'
import { Farm } from 'domains/farm.domain'

@Injectable()
export class CreateProducerUseCase
  implements UseCase<CreateProducerInput, CreateProducerOutput, any>
{
  constructor(
    private readonly producerRepository: IProducerRepository,
    private readonly addressRepository: IAddressRepository,
    private readonly farmRepository: IFarmRepository,
    private readonly cultureRepository: ICultureRepository
  ) {}

  public async execute(
    input: CreateProducerInput
  ): Promise<Result<CreateProducerOutput, any>> {
    const producer = new Producer(input.producer)
    await this.producerRepository.save(producer)

    const address = new Address(input.farm.address)
    await this.addressRepository.save(address)

    const cultures = input.farm.plantedCultures.map(
      (culture) => new Culture(culture)
    )
    const culturePromises = cultures.map((culture) =>
      this.cultureRepository.save(culture)
    )
    await Promise.all(culturePromises)

    const farm = new Farm({
      name: input.farm.name,
      totalHectares: input.farm.totalHectares,
      cultivableHectares: input.farm.cultivableHectares,
      vegetationHectares: input.farm.vegetationHectares,
      address: address,
      plantedCultures: cultures
    })
    await this.farmRepository.save(farm)

    // TODO: return input + id
    const output: CreateProducerOutput = {
      producer,
      farm
    }
    return new Ok(output)
  }
}
