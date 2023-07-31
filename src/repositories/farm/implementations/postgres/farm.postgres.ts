import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UUID } from 'crypto'

// Domains
import { Farm } from 'domains/farm.entity'

// configs
import { Err, Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IFarmRepository } from 'repositories/farm/farm.contract'

@Injectable()
export class PostgresFarmRepository implements IFarmRepository {
  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>
  ) {}

  async save(farm: Farm): Promise<Result<null, Error>> {
    try {
      await this.farmRepository.create(farm)
      return new Ok(null)
    } catch (err) {
      return new Err(Error('Unable to create Farm!'))
    }
  }

  async update(farm: Farm): Promise<Result<Farm, Error>> {
    try {
      const farmUpdated = await this.farmRepository.save(farm)
      return new Ok(farmUpdated)
    } catch (err) {
      return new Err(Error('Unable to update Farm'))
    }
  }

  async getById(id: UUID): Promise<Result<Farm, Error>> {
    const farm = await this.farmRepository.findOne({
      where: { id },
      relations: ['address', 'cultures']
    })
    return farm ? new Ok(farm) : new Err(Error('Farm Not Found!'))
  }
}
