import { Injectable } from '@nestjs/common'

// Domains
import { Address } from 'domains/address.entity'

// configs
import { Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IAddressRepository } from 'repositories/address/address.contract'

@Injectable()
export class InMemoryAddressRepository implements IAddressRepository {
  private addresses: Address[] = []

  async save(address: Address): Promise<Result<null, Error>> {
    this.addresses.push(address)
    return new Ok(null)
  }
}
