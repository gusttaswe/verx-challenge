import { Injectable } from '@nestjs/common'
import { UUID } from 'crypto'

// Domains
import { Producer } from 'domains/producer.entity'
import { Document } from 'domains/document.domain'

// configs
import { Err, Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IProducerRepository } from '../../producer.contract'

@Injectable()
export class InMemoryProducerRepository implements IProducerRepository {
  private producers: Producer[] = []

  async save(producer: Producer): Promise<Result<Producer, Error>> {
    this.producers.push(producer)
    return new Ok(producer)
  }

  async exists(ref: Document | UUID): Promise<boolean> {
    const producer =
      ref instanceof Document
        ? this.producers.find((producer) => producer.document === ref.value)
        : this.producers.find((producer) => producer.id === ref)
    return producer !== undefined
  }

  async getById(id: UUID): Promise<Result<Producer, Error>> {
    const producer = this.producers.find((producer) => producer.id === id)
    return producer ? new Ok(producer) : new Err(Error('Producer Not Found!'))
  }
}
