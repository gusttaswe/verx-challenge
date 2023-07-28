import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import { CoreEntity } from 'shared/core/entity'
import { Culture } from './culture.entity'
import { Address } from './address.entity'
import { Producer } from './producer.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne
} from 'typeorm'

interface FarmProps {
  name: string
  totalArea: number
  cultivableArea: number
  vegetationArea: number
  address: Address
  cultures: Culture[]
}

@Entity()
export class Farm extends CoreEntity<FarmProps> {
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
  @Column()
  name: string

  @ApiProperty({
    description: 'The total area of the farm in hectares',
    example: 1000
  })
  @Column()
  totalArea: number

  @ApiProperty({
    description: 'The cultivable area of the farm in hectares',
    example: 800
  })
  @Column()
  cultivableArea: number

  @ApiProperty({
    description: 'The area of vegetation on the farm in hectares',
    example: 200
  })
  @Column()
  vegetationArea: number

  @ApiProperty({
    description: 'where the farm is located',
    example: {
      city: 'São José dos Campos',
      state: 'São Paulo'
    }
  })
  @OneToOne(() => Address)
  @JoinColumn()
  address: Address

  @ManyToOne(() => Producer, (producer) => producer.farm)
  producer: Producer

  @ManyToMany(() => Culture)
  @JoinTable()
  cultures: Culture[]
}
