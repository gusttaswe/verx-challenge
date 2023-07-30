import { Result } from 'shared/config/neverthrow.config'

// Domains
import { Farm } from 'domains/farm.entity'

export abstract class IFarmRepository {
  abstract save(farm: Farm): Promise<Result<null, Error>>
}
