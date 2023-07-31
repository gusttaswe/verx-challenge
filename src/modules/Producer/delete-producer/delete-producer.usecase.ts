import { Injectable } from '@nestjs/common'
import { Ok, Err, Result } from 'neverthrow'

// Repositories
import { IProducerRepository } from 'repositories/producer/producer.contract'

// Module
import { UseCase } from 'shared/core/usecase'
import { DeleteProducerError } from './delete-producer.error'

// DTOs
import { DeleteProducerParams } from './delete-producer.dto'

type DeleteProducerResponse = Result<null, DeleteProducerError>

@Injectable()
export class DeleteProducerUseCase
  implements UseCase<DeleteProducerParams, null, DeleteProducerError>
{
  constructor(private readonly producerRepository: IProducerRepository) {}

  public async execute({ id }: DeleteProducerParams): Promise<DeleteProducerResponse> {
    const producerOrError = await this.producerRepository.getById(id)
    if (producerOrError.isErr()) return new Err(DeleteProducerError.ProducerNotFound())

    const result = await this.producerRepository.delete(id)
    if (result.isErr()) return new Err(DeleteProducerError.UnableToDelete())

    return new Ok(null)
  }
}
