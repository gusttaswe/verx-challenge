import { ApiProperty } from '@nestjs/swagger'
import { Entity } from 'shared/core/entity'

import { Document } from './document.domain'
import { UUID } from 'crypto'

export interface ProducerProps {
  document: Document
  name: string
}

export class Producer extends Entity<ProducerProps> {
  constructor(props: ProducerProps, id?: UUID) {
    super(props, id)
  }

  @ApiProperty({
    description: 'The name of the producer',
    example: 'John Doe'
  })
  get name(): ProducerProps['name'] {
    return this.props.name
  }

  @ApiProperty({
    description: 'The CPF or CNPJ of the producer',
    example: '12345678900'
  })
  get document(): ProducerProps['document']['value'] {
    return this.props.document.value
  }
}
