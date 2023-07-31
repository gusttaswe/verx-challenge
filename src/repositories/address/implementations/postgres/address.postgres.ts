import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Domains
import { Address } from 'domains/address.entity'

// configs
import { Err, Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IAddressRepository, StateDistribution } from 'repositories/address/address.contract'

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

  async getStateDistribution(): Promise<Result<StateDistribution[], Error>> {
    try {
      const addresses = await this.addressRepository.find({ relations: ['farm'] })
      const stateDistribution = addresses.reduce((total, address) => {
        total[address.state] = (total[address.state] || 0) + 1
        return total
      }, {})

      const stateDistributionList = Object.entries(stateDistribution).map(
        ([state, count]) => ({
          state,
          count
        })
      ) as StateDistribution[]

      return new Ok(stateDistributionList)
    } catch (err) {
      console.log('error', err)
      return new Err(Error('Unable to fetch farm data'))
    }
  }
}
