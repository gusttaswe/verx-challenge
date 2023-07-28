import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, OneToMany } from 'typeorm'
import { UUID } from 'crypto'

// shared
import { CoreEntity } from 'shared/core/entity'

// domains
import { Farm } from './farm.entity'
import { Document } from './document.domain'

export interface ProducerProps {
  document: Document
  name: string
  farm: Farm[]
}

@Entity()
export class Producer extends CoreEntity<ProducerProps> {
  constructor(props: ProducerProps, id?: UUID) {
    super(props, id)
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

  @OneToMany(() => Farm, (farm) => farm.producer)
  farm: Farm[]
}
