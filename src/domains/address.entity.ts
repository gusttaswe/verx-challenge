import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'
import { IsString, IsDateString } from 'class-validator'

// shared
import { CoreEntity } from 'shared/core/entity'
import { Result, Ok } from 'shared/config/neverthrow.config'

interface AddressProps {
  city: string
  state: string
}

@Entity()
export class Address extends CoreEntity {
  constructor() {
    super()
  }

  static create(props: AddressProps): Result<Address, Error> {
    const address = new Address()
    Object.assign(address, props)
    return new Ok(address)
  }

  @ApiProperty({
    description: 'City Name',
    example: 'São José dos Campos'
  })
  @Column()
  @IsString()
  city: string

  @ApiProperty({
    description: 'State',
    example: 'São Paulo'
  })
  @Column()
  @IsString()
  state: string

  @ApiProperty({
    description: 'Address creation date',
    example: '2023-07-30T05:45:58.755Z'
  })
  @CreateDateColumn()
  @IsDateString()
  created_at?: Date

  @ApiProperty({
    description: 'Address last update date',
    example: '2023-07-30T05:45:58.755Z'
  })
  @UpdateDateColumn()
  @IsDateString()
  updated_at?: Date
}
