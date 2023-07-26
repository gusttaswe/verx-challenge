import { Injectable } from '@nestjs/common'

// Domains
import { Culture } from 'domains/culture.domain'

// configs
import { Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { ICultureRepository } from 'repositories/culture/culture.contract'

@Injectable()
export class FakeCultureRepository implements ICultureRepository {
  private cultures: Culture[] = []

  async save(culture: Culture): Promise<Result<null, Error>> {
    this.cultures.push(culture)
    return new Ok(null)
  }
}
