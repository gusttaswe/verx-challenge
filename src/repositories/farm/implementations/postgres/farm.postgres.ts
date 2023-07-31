import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UUID } from 'crypto'

// Domains
import { Farm } from 'domains/farm.entity'

// configs
import { Err, Ok, Result } from 'shared/config/neverthrow.config'

// Contract
import {
  GetAreaUsageDistribution,
  GetCultureDistribution,
  GetTotalFarms,
  IFarmRepository
} from 'repositories/farm/farm.contract'

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

  async getTotalFarms(): Promise<Result<GetTotalFarms, Error>> {
    try {
      const { totalFarms, totalFarmArea } = await this.farmRepository
        .createQueryBuilder('farm')
        .select('SUM(farm.totalArea)', 'totalFarmArea')
        .addSelect('COUNT(farm.id)', 'totalFarms')
        .getRawOne()

      return new Ok({
        totalFarms: parseInt(totalFarms),
        totalFarmArea: parseFloat(totalFarmArea)
      })
    } catch (err) {
      return new Err(Error('Unable to fetch farm data'))
    }
  }

  async getCultureDistribution(): Promise<Result<GetCultureDistribution[], Error>> {
    try {
      const farms = await this.farmRepository.find({ relations: ['cultures'] })
      const distribution = {}
      farms.forEach((farm) =>
        farm.cultures.forEach(({ name }) => {
          distribution[name] = (distribution[name] || 0) + 1
        })
      )

      const distributionList = Object.entries(distribution).map(([culture, farmsCount]) => ({
        culture,
        farmsCount
      })) as GetCultureDistribution[]

      return new Ok(distributionList)
    } catch (err) {
      return new Err(Error('Unable to fetch farm data'))
    }
  }

  async getAreaUsageDistribution(): Promise<Result<GetAreaUsageDistribution[], Error>> {
    try {
      const { agriculturalArea, vegetationArea } = await this.farmRepository
        .createQueryBuilder('farm')
        .select('SUM(farm.cultivableArea)', 'agriculturalArea')
        .addSelect('SUM(farm.vegetationArea)', 'vegetationArea')
        .getRawOne()

      const landUsageDistribution: GetAreaUsageDistribution[] = [
        { usageType: 'Agricultável', totalArea: parseFloat(agriculturalArea) },
        { usageType: 'Vegetação', totalArea: parseFloat(vegetationArea) }
      ]

      return new Ok(landUsageDistribution)
    } catch (err) {
      return new Err(Error('Unable to fetch farm data'))
    }
  }
}
