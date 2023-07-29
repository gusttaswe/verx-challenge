import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, OneToMany } from 'typeorm'

// shared
import { CoreEntity } from 'shared/core/entity'
import { Result, Ok } from 'shared/config/neverthrow.config'

// domains
import { Farm } from './farm.entity'
import { Document } from './document.domain'

export interface ProducerProps {
  document: Document
  name: string
  farms: Farm[]
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
  name: string

  @ApiProperty({
    description: 'The CPF or CNPJ of the producer',
    example: '12345678900'
  })
  @Column()
  document: string

  @OneToMany(() => Farm, (farm) => farm.producer, { cascade: true })
  farms: Farm[]
}
