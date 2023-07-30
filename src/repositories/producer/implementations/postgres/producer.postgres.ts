import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UUID } from 'crypto'

// Domains
import { Producer } from 'domains/producer.entity'
import { Document } from 'domains/document.domain'

// configs
import { Err, Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IProducerRepository } from 'repositories/producer/producer.contract'

@Injectable()
export class PostgresProducerRepository implements IProducerRepository {
  constructor(
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>
  ) {}

  async save(producer: Producer): Promise<Result<Producer, Error>> {
    try {
      const producerCreated = await this.producerRepository.save(producer)
      return new Ok(producerCreated)
    } catch (err) {
      return new Err(Error('Unable to create producer!'))
    }
  }

  async update(producer: Producer): Promise<Result<Producer, Error>> {
    try {
      const producerUpdated = await this.producerRepository.save(producer)
      return new Ok(producerUpdated)
    } catch (err) {
      return new Err(Error('Unable to update producer'))
    }
  }

  async exists(document: Document): Promise<boolean> {
    return await this.producerRepository.exist({
      where: {
        document: document.value
      }
    })
  }

  async getById(id: UUID): Promise<Result<Producer, Error>> {
    const producer = await this.producerRepository.findOneBy({ id: id })
    return producer ? new Ok(producer) : new Err(Error('Producer Not Found!'))
  }
}
