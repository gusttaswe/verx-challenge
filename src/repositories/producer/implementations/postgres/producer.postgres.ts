import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Domains
import { Producer } from 'domains/producer.entity'
import { Document } from 'domains/document.domain'

// configs
import { Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IProducerRepository } from 'repositories/producer/producer.contract'

@Injectable()
export class PostgresProducerRepository implements IProducerRepository {
  constructor(
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>
  ) {}

  async save(producer: Producer): Promise<Result<Producer, Error>> {
    const producerCreated = await this.producerRepository.save(producer)
    return new Ok(producerCreated)
  }

  async exists(document: Document): Promise<boolean> {
    return await this.producerRepository.exist({
      where: {
        document: document.value
      }
    })
  }
}
