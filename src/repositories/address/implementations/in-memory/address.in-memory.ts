import { Injectable } from '@nestjs/common'

// Domains
import { Address } from 'domains/address.entity'

// configs
import { Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IAddressRepository, StateDistribution } from 'repositories/address/address.contract'

@Injectable()
export class InMemoryAddressRepository implements IAddressRepository {
  private addresses: Address[] = []

  async save(address: Address): Promise<Result<null, Error>> {
    this.addresses.push(address)
    return new Ok(null)
  }

  async getStateDistribution(): Promise<Result<StateDistribution[], Error>> {
    const stateDistribution = this.addresses.reduce((total, address) => {
      total[address.state] = (total[address.state] || 0) + 1
      return total
    }, {})

    const stateDistributionList = Object.entries(stateDistribution).map(([state, count]) => ({
      state,
      count
    })) as StateDistribution[]

    return new Ok(stateDistributionList)
  }
}
