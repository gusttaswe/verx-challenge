import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Domains
import { Address } from 'domains/address.entity'

// configs
import { Err, Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IAddressRepository } from 'repositories/address/address.contract'

@Injectable()
export class PostgresAddressRepository implements IAddressRepository {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>
  ) {}

  async save(producer: Address): Promise<Result<null, Error>> {
    await this.addressRepository.save(producer)
    return new Ok(null)
  }
}
