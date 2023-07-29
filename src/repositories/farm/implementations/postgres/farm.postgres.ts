import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// Domains
import { Farm } from 'domains/farm.entity'

// configs
import { Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IFarmRepository } from 'repositories/farm/farm.contract'

@Injectable()
export class PostgresFarmRepository implements IFarmRepository {
  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>
  ) {}

  async save(farm: Farm): Promise<Result<null, Error>> {
    await this.farmRepository.create(farm)
    return new Ok(null)
  }
}
