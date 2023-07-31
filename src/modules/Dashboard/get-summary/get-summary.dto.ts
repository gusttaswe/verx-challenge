import { ApiProperty } from '@nestjs/swagger'

import { UUID } from 'crypto'

// Domains
import { Farm } from 'domains/farm.entity'
import { Address } from 'domains/address.entity'
import { Culture, cultureTypes } from 'domains/culture.entity'

class StateDistribution {
  state: string
  count: number
}

class CultureDistribution {
  culture: string
  farmsCount: number
}

class AreaUsageDistribution {
  usageType: 'Agricultável' | 'Vegetação'
  totalArea: number
}

export class GetSummaryOutput {
  @ApiProperty({
    description: 'The total number of farms',
    example: 10
  })
  totalFarms: number

  @ApiProperty({
    description: 'The total area of all farms in hectares',
    example: 150
  })
  totalFarmArea: number

  @ApiProperty({
    description: 'The distribution of farms by state',
    example: [
      { state: 'Sergipe', count: 1 },
      { state: 'Bahia', count: 2 },
      { state: 'Pernambuco', count: 5 }
    ]
  })
  stateDistribution: StateDistribution[]

  @ApiProperty({
    description: 'The distribution of farms by culture',
    example: [
      { culture: 'Café', farmsCount: 5 },
      { culture: 'Cana de açucar', farmsCount: 6 },
      { culture: 'Soja', farmsCount: 4 },
      { culture: 'Milho', farmsCount: 5 }
    ]
  })
  cultureDistribution: CultureDistribution[]

  @ApiProperty({
    description: 'the land usage distributio',
    example: [
      { usageType: 'Agricultável', totalArea: 120 },
      { usageType: 'Vegetação', totalArea: 30 }
    ]
  })
  areaUsageDistribution: AreaUsageDistribution[]
}
