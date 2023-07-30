import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Domains
import { Culture } from 'domains/culture.entity'

// configs
import { Err, Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { ICultureRepository } from 'repositories/culture/culture.contract'

// Mapper
import { CultureMapper } from './culture.mapper'

@Injectable()
export class PostgresCultureRepository implements ICultureRepository {
  private mapper: CultureMapper = new CultureMapper()

  constructor(
    @InjectRepository(Culture)
    private CultureRepository: Repository<Culture>
  ) {}

  async save(Culture: Culture): Promise<Result<null, Error>> {
    await this.CultureRepository.save(Culture)
    return new Ok(null)
  }

  async getByName(name: string): Promise<Result<Culture, Error>> {
    const cultureData = await this.CultureRepository.findOne({ where: { name } })
    if (!cultureData) return new Err(Error('Culture not found!'))
    const culture = this.mapper.toDomain(cultureData)
    return culture ? new Ok(culture) : new Err(Error('Unable to map culture!'))
  }
}
