import { Injectable } from '@nestjs/common'

// Domains
import { Producer } from 'domains/producer.domain'

// configs
import { Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IProducerRepository } from '../../producer.contract'

@Injectable()
export class FakeProducerRepository implements IProducerRepository {
  private producers: Producer[]

  async save(producer: Producer): Promise<Result<null, Error>> {
    this.producers.push(producer)
    return new Ok(null)
  }
}
