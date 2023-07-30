import { Injectable } from '@nestjs/common'

// Domains
import { Culture } from 'domains/culture.entity'

// Shared
import { Err, Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { ICultureRepository } from 'repositories/culture/culture.contract'

// Implementation
import { cultures } from './culture.mock'
import { CultureMapper } from './culture.mapper'

@Injectable()
export class InMemoryCultureRepository implements ICultureRepository {
  private cultures: Culture[] = cultures
  private mapper: CultureMapper = new CultureMapper()

  async save(culture: Culture): Promise<Result<null, Error>> {
    this.cultures.push(culture)
    return new Ok(null)
  }

  async getByName(name: string): Promise<Result<Culture, Error>> {
    const cultureData = this.cultures.find((culture) => culture.name === name)
    if (!cultureData) return new Err(Error('Culture not found!'))
    const culture = this.mapper.toDomain(cultureData)
    return culture ? new Ok(culture) : new Err(Error('Unable to map Culture'))
  }
}
