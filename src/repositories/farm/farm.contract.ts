import { UUID } from 'crypto'
import { Result } from 'shared/config/neverthrow.config'

// Domains
import { Farm } from 'domains/farm.entity'

export type GetTotalFarms = {
  totalFarms: number
  totalFarmArea: number
}

export type GetCultureDistribution = {
  culture: string
  farmsCount: number
}

export type GetAreaUsageDistribution = {
  usageType: 'Agricultável' | 'Vegetação'
  totalArea: number
}

export abstract class IFarmRepository {
  abstract save(farm: Farm): Promise<Result<null, Error>>
  abstract getById(id: UUID): Promise<Result<Farm, Error>>
  abstract update(farm: Farm): Promise<Result<Farm, Error>>
  abstract getTotalFarms(): Promise<Result<GetTotalFarms, Error>>
  abstract getCultureDistribution(): Promise<Result<GetCultureDistribution[], Error>>
  abstract getAreaUsageDistribution(): Promise<Result<GetAreaUsageDistribution[], Error>>
}
