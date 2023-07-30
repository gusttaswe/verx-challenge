import { Injectable } from '@nestjs/common'
import { Ok, Err, Result } from 'neverthrow'

// Repositories
import { IProducerRepository } from 'repositories/producer/producer.contract'

// Module
import { UseCase } from 'shared/core/usecase'
import { UpdateProducerError } from './update-producer.error'

// Domain Entities
import { Producer } from 'domains/producer.entity'
import { Document } from 'domains/document.domain'

// DTOs
import { UpdateProducerInput, UpdateProducerOutput } from './update-producer.dto'

type UpdateProducerResponse = Result<UpdateProducerOutput, UpdateProducerError>

@Injectable()
export class UpdateProducerUseCase
  implements UseCase<UpdateProducerInput, UpdateProducerOutput, UpdateProducerError>
{
  constructor(private readonly producerRepository: IProducerRepository) {}

  public async execute(input: UpdateProducerInput): Promise<UpdateProducerResponse> {
    if (input.document) {
      const documentOrError = Document.create(input.document)
      if (documentOrError.isErr()) return new Err(UpdateProducerError.InvalidDocument())
    }

    const producerResult = await this.producerRepository.getById(input.id)

    if (producerResult.isErr()) return new Err(UpdateProducerError.ProducerNotFound())
    const producer: Producer = producerResult.value

    const updatedProducer = Object.assign(producer, input)

    const produceOrError = await this.producerRepository.update(updatedProducer)
    if (produceOrError.isErr()) return new Err(UpdateProducerError.UnableToUpdateProducer())

    return new Ok(produceOrError.value)
  }
}
