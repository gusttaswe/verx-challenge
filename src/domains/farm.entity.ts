import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  UpdateDateColumn
} from 'typeorm'
import { IsString, IsNumber, IsDateString } from 'class-validator'

// shared
import { CoreEntity } from 'shared/core/entity'
import { Result, Ok, Err } from 'shared/config/neverthrow.config'

// Entities
import { ApiProperty } from '@nestjs/swagger'
import { Culture } from './culture.entity'
import { Address } from './address.entity'
import { Producer } from './producer.entity'

interface FarmProps {
  name: string
  totalArea: number
  cultivableArea: number
  vegetationArea: number
  address: Address
  cultures: Culture[]
}

@Entity()
export class Farm extends CoreEntity {
  constructor() {
    super()
  }

  static isTotalAreaInsufficient(
    farm: Pick<FarmProps, 'cultivableArea' | 'vegetationArea' | 'totalArea'>
  ) {
    const { cultivableArea, vegetationArea, totalArea } = farm
    return cultivableArea + vegetationArea > totalArea
  }

  static create(props: FarmProps): Result<Farm, Error> {
    if (this.isTotalAreaInsufficient(props)) return new Err(Error('Insufficient area!'))
    const farm = new Farm()
    Object.assign(farm, props)
    return new Ok(farm)
  }

  @ApiProperty({
    description: 'The name of the farm',
    example: 'Farm of Joy'
  })
  @Column()
  @IsString()
  name: string

  @ApiProperty({
    description: 'The total area of the farm in hectares',
    example: 1000
  })
  @Column()
  @IsNumber()
  totalArea: number

  @ApiProperty({
    description: 'The cultivable area of the farm in hectares',
    example: 800
  })
  @Column()
  @IsNumber()
  cultivableArea: number

  @ApiProperty({
    description: 'The area of vegetation on the farm in hectares',
    example: 200
  })
  @Column()
  @IsNumber()
  vegetationArea: number

  @ApiProperty({
    description: 'where the farm is located',
    example: {
      city: 'São José dos Campos',
      state: 'São Paulo'
    }
  })
  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address: Address

  @ManyToOne(() => Producer, (producer) => producer.farms)
  producer?: Producer

  @ApiProperty({
    description: 'The area of vegetation on the farm in hectares',
    type: [Culture]
  })
  @ManyToMany(() => Culture, { cascade: true })
  @JoinTable()
  cultures: Culture[]

  @ApiProperty({
    description: 'Farm creation date',
    example: '2023-07-30T05:45:58.755Z'
  })
  @CreateDateColumn()
  @IsDateString()
  created_at?: Date

  @ApiProperty({
    description: 'Farm last update date',
    example: '2023-07-30T05:45:58.755Z'
  })
  @UpdateDateColumn()
  @IsDateString()
  updated_at?: Date
}
