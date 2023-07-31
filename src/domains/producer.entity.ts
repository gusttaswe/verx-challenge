import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsString, IsDateString } from 'class-validator'

// shared
import { CoreEntity } from 'shared/core/entity'
import { Result, Ok } from 'shared/config/neverthrow.config'

// domains
import { Farm } from './farm.entity'
import { Document } from './document.domain'

export interface ProducerProps {
  document: Document
  name: string
  farms?: Farm[]
}

@Entity()
export class Producer extends CoreEntity {
  constructor() {
    super()
  }

  static create(props: ProducerProps): Result<Producer, Error> {
    const producer = new Producer()
    Object.assign(producer, { ...props, document: props.document.value })
    return new Ok(producer)
  }

  @ApiProperty({
    description: 'The name of the producer',
    example: 'John Doe'
  })
  @Column()
  @IsString()
  name: string

  @ApiProperty({
    description: 'The CPF or CNPJ of the producer',
    example: '12345678900'
  })
  @Column()
  @IsString()
  document: string

  @ApiProperty({
    description: 'Farms associated with Producer',
    type: [Farm]
  })
  @OneToMany(() => Farm, (farm) => farm.producer, { cascade: true, onDelete: 'CASCADE' })
  farms?: Farm[]

  @ApiProperty({
    description: 'Producer creation date',
    example: '2023-07-30T05:45:58.755Z'
  })
  @CreateDateColumn()
  @IsDateString()
  created_at?: Date

  @ApiProperty({
    description: 'Producer last update date',
    example: '2023-07-30T05:45:58.755Z'
  })
  @UpdateDateColumn()
  @IsDateString()
  updated_at?: Date
}
