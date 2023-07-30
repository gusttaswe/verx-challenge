import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Domains
import { Address } from 'domains/address.entity'

// configs
import { Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IAddressRepository } from 'repositories/address/address.contract'

@Injectable()
export class PostgresAddressRepository implements IAddressRepository {
  constructor(
    @InjectRepository(Address)
    private producerRepository: Repository<Address>
  ) {}

  async save(producer: Address): Promise<Result<null, Error>> {
    await this.producerRepository.save(producer)
    return new Ok(null)
  }
}
