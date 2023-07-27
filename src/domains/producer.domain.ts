import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import { Entity } from 'shared/core/entity'

import { Document } from './document.domain'

interface ProducerProps {
  id?: UUID
  document: Document
  name: string
}

export class Producer extends Entity<ProducerProps> {
  @ApiProperty({
    description: 'The name of the producer',
    example: 'John Doe'
  })
  name: string

  @ApiProperty({
    description: 'The CPF or CNPJ of the producer',
    example: '12345678900'
  })
  document: Document

  constructor({ id, ...props }: ProducerProps) {
    super(props, id)
  }
}
