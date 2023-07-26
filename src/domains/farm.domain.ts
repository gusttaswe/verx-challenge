import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import { Entity } from 'shared/core/entity'
import { Culture, cultureTypes } from './culture.domain'
import { Address } from './address.domain'

interface FarmProps {
  id?: UUID
  name: string
  totalHectares: number
  cultivableHectares: number
  vegetationHectares: number
  address: Address
  plantedCultures: Culture[]
}

export class Farm extends Entity<FarmProps> {
  @ApiProperty({
    description: 'The name of the farm',
    example: 'Farm of Joy'
  })
  name: string

  @ApiProperty({
    description: 'The total area of the farm in hectares',
    example: 1000
  })
  totalHectares: number

  @ApiProperty({
    description: 'The cultivable area of the farm in hectares',
    example: 800
  })
  cultivableHectares: number

  @ApiProperty({
    description: 'The area of vegetation on the farm in hectares',
    example: 200
  })
  vegetationHectares: number

  @ApiProperty({
    description: 'The list of cultures planted on the farm',
    example: [cultureTypes.SOJA, cultureTypes.MILHO]
  })
  plantedCultures: Culture[]

  @ApiProperty({
    description: 'where the farm is located',
    example: {
      city: 'São José dos Campos',
      state: 'São Paulo'
    }
  })
  address: Address

  constructor({ id, ...props }: FarmProps) {
    super(props, id)
  }
}
