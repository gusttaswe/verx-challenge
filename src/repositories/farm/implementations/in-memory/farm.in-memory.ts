import { Injectable } from '@nestjs/common'
import { UUID } from 'crypto'

// Domains
import { Farm } from 'domains/farm.entity'

// configs
import { Err, Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import {
  GetAreaUsageDistribution,
  GetCultureDistribution,
  GetStateDistribution,
  GetTotalFarms,
  IFarmRepository
} from 'repositories/farm/farm.contract'

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

  async getTotalFarms(): Promise<Result<GetTotalFarms, Error>> {
    const { totalFarms, totalFarmArea } = this.farms.reduce(
      (total, farm) => {
        total.totalFarms += 1
        total.totalFarmArea += farm.totalArea
        return total
      },
      {
        totalFarms: 0,
        totalFarmArea: 0
      }
    )
    return new Ok({ totalFarms, totalFarmArea })
  }

  async getCultureDistribution(): Promise<Result<GetCultureDistribution[], Error>> {
    const distribution = {}
    this.farms.forEach((farm) =>
      farm.cultures.forEach(({ name }) => {
        distribution[name] = (distribution[name] || 0) + 1
      })
    )

    const distributionList = Object.entries(distribution).map(([culture, farmsCount]) => ({
      culture,
      farmsCount
    })) as GetCultureDistribution[]

    return new Ok(distributionList)
  }

  async getAreaUsageDistribution(): Promise<Result<GetAreaUsageDistribution[], Error>> {
    const agriculturalArea = this.farms.reduce((total, farm) => total + farm.cultivableArea, 0)
    const vegetationArea = this.farms.reduce((total, farm) => total + farm.vegetationArea, 0)

    const landUsageDistribution: GetAreaUsageDistribution[] = [
      { usageType: 'Agricultável', totalArea: agriculturalArea },
      { usageType: 'Vegetação', totalArea: vegetationArea }
    ]

    return new Ok(landUsageDistribution)
  }

  async getStateDistribution(): Promise<Result<GetStateDistribution[], Error>> {
    const stateDistribution = this.farms.reduce((total, { address }) => {
      total[address.state] = (total[address.state] || 0) + 1
      return total
    }, {})

    const stateDistributionList = Object.entries(stateDistribution).map(([state, count]) => ({
      state,
      count
    })) as GetStateDistribution[]

    return new Ok(stateDistributionList)
  }
}
