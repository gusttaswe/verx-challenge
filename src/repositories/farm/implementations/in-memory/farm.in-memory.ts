import { Injectable } from '@nestjs/common'
import { UUID } from 'crypto'

// Domains
import { Farm } from 'domains/farm.entity'

// configs
import { Err, Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IFarmRepository } from 'repositories/farm/farm.contract'

@Injectable()
export class InMemoryFarmRepository implements IFarmRepository {
  private farms: Farm[] = []

  async save(farm: Farm): Promise<Result<null, Error>> {
    this.farms.push(farm)
    return new Ok(null)
  }

  async getById(id: UUID): Promise<Result<Farm, Error>> {
    const Farm = this.farms.find((farm) => farm.id === id)
    return Farm ? new Ok(Farm) : new Err(Error('Farm Not Found!'))
  }

  async update(farm: Farm): Promise<Result<Farm, Error>> {
    const index = this.farms.findIndex((p) => p.id === farm.id)
    Object.assign(this.farms[index], Farm)
    return new Ok(this.farms[index])
  }
}
