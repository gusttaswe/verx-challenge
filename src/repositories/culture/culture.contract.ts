import { Result } from 'shared/config/neverthrow.config'

// Domains
import { Culture } from 'domains/culture.entity'

export abstract class ICultureRepository {
  abstract save(culture: Culture): Promise<Result<null, Error>>
  abstract getByName(name: string): Promise<Result<Culture, Error>>
}
