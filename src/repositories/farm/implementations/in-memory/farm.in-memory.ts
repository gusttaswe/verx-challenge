import { Injectable } from '@nestjs/common'

// Domains
import { Farm } from 'domains/farm.entity'

// configs
import { Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import { IFarmRepository } from 'repositories/farm/farm.contract'

@Injectable()
export class InMemoryFarmRepository implements IFarmRepository {
  private farms: Farm[] = []

  async save(farm: Farm): Promise<Result<null, Error>> {
    this.farms.push(farm)
    return new Ok(null)
  }
}
