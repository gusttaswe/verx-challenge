import { Injectable } from '@nestjs/common'
import { Ok, Err, Result } from 'neverthrow'
import { UUID } from 'crypto'

// Repositories
import { IProducerRepository } from 'repositories/producer/producer.contract'
import { ICultureRepository } from 'repositories/culture/culture.contract'
import { IFarmRepository } from 'repositories/farm/farm.contract'

// Module
import { UseCase } from 'shared/core/usecase'
import { UpdateProducerError } from './update-producer.error'

// Domain Entities
import { Producer } from 'domains/producer.entity'
import { Farm } from 'domains/farm.entity'
import { Address } from 'domains/address.entity'
import { Document } from 'domains/document.domain'
import { Culture } from 'domains/culture.entity'

// DTOs
import { UpdateProducerInput, UpdateProducerOutput } from './update-producer.dto'

type UpdateProducerResponse = Result<UpdateProducerOutput, UpdateProducerError>

@Injectable()
export class UpdateProducerUseCase
  implements UseCase<UpdateProducerInput, UpdateProducerOutput, UpdateProducerError>
{
  constructor(
    private readonly producerRepository: IProducerRepository,
    private readonly farmRepository: IFarmRepository
  ) {}

  public async execute(input: UpdateProducerInput): Promise<UpdateProducerResponse> {
    const [producerResult, farmResult] = await Promise.all([
      this.producerRepository.getById(input.producer.id),
      this.farmRepository.getById(input.farm.id)
    ])

    if (producerResult.isErr()) return new Err(UpdateProducerError.ProducerNotFound())
    const producer: Producer = producerResult.value

    if (farmResult.isErr()) return new Err(UpdateProducerError.FarmNotFound())
    const farm: Farm = farmResult.value

    const updatedProducer = Object.assign(producer, input.producer)
    const updatedFarm = Object.assign(farm, input.farm)

    const produceOrError = await this.producerRepository.update({
      ...updatedProducer,
      farms: [updatedFarm]
    })
    if (produceOrError.isErr()) return new Err(UpdateProducerError.UnableToCreateProducer())

    return new Ok(produceOrError.value)
  }
}
