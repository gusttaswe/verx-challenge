import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import { Entity } from 'shared/core/entity'
import { Culture, cultureTypes } from './culture.entity'
import { Address } from './address.entity'

interface FarmProps {
  name: string
  totalArea: number
  cultivableArea: number
  vegetationArea: number
  address: Address
  plantedCultures: Culture[]
}

export class Farm extends Entity<FarmProps> {
  constructor(props: FarmProps, id?: UUID) {
    super(props, id)
  }

  static isTotalAreaInsufficient(
    farm: Pick<FarmProps, 'cultivableArea' | 'vegetationArea' | 'totalArea'>
  ) {
    const { cultivableArea, vegetationArea, totalArea } = farm
    return cultivableArea + vegetationArea > totalArea
  }

  @ApiProperty({
    description: 'The name of the farm',
    example: 'Farm of Joy'
  })
  get name(): string {
    return this.props.name
  }

  @ApiProperty({
    description: 'The total area of the farm in hectares',
    example: 1000
  })
  get totalArea(): number {
    return this.props.totalArea
  }

  @ApiProperty({
    description: 'The cultivable area of the farm in hectares',
    example: 800
  })
  get cultivableArea(): number {
    return this.props.cultivableArea
  }

  @ApiProperty({
    description: 'The area of vegetation on the farm in hectares',
    example: 200
  })
  get vegetationArea(): number {
    return this.props.vegetationArea
  }

  @ApiProperty({
    description: 'The list of cultures planted on the farm',
    example: [cultureTypes.SOJA, cultureTypes.MILHO]
  })
  get plantedCultures(): Culture[] {
    return this.props.plantedCultures
  }

  @ApiProperty({
    description: 'where the farm is located',
    example: {
      city: 'São José dos Campos',
      state: 'São Paulo'
    }
  })
  get address(): Address {
    return this.props.address
  }
}
