import { Result } from 'shared/config/neverthrow.config'

// Domains
import { Address } from 'domains/address.entity'

export abstract class IAddressRepository {
  abstract save(address: Address): Promise<Result<null, Error>>
}
