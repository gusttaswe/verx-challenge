import { Injectable } from '@nestjs/common'

// Domains
import { Producer } from 'domains/producer.entity'
import { Document } from 'domains/document.domain'

// configs
import { Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IProducerRepository } from '../../producer.contract'

@Injectable()
export class InMemoryProducerRepository implements IProducerRepository {
  private producers: Producer[] = []

  async save(producer: Producer): Promise<Result<Producer, Error>> {
    this.producers.push(producer)
    return new Ok(producer)
  }

  async exists(document: Document): Promise<boolean> {
    const producer = this.producers.find((producer) => producer.document === document.value)
    return producer !== undefined
  }
}
