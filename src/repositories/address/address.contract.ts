import { Result } from 'shared/config/neverthrow.config'

// Domains
import { Address } from 'domains/address.entity'

export type StateDistribution = {
  state: Address['state']
  count: number
}

export abstract class IAddressRepository {
  abstract save(address: Address): Promise<Result<null, Error>>
  abstract getStateDistribution(): Promise<Result<StateDistribution[], Error>>
}
