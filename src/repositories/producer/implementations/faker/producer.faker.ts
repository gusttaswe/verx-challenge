import { Injectable } from '@nestjs/common'

// Domains
import { Producer } from 'domains/producer.domain'

// configs
import { Err, Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IProducerRepository } from '../../producer.contract'
import { Document } from 'domains/document.domain'

@Injectable()
export class FakeProducerRepository implements IProducerRepository {
  private producers: Producer[] = []

  async save(producer: Producer): Promise<Result<null, Error>> {
    this.producers.push(producer)
    return new Ok(null)
  }

  async getByDocument(document: Document): Promise<Result<Producer, Error>> {
    const producer = this.producers.find(
      (producer) => producer.document.value === document.value
    )

    return producer ? new Ok(producer) : new Err(Error('Producer not found!'))
  }
}
