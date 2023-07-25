import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import { Entity } from 'shared/core/entity'

interface ProducerProps {
  id?: UUID
  document: string
  name: string
}

export class Producer extends Entity<ProducerProps> {
  @ApiProperty({
    description: 'The CPF or CNPJ of the producer',
    example: '12345678900'
  })
  document: string

  @ApiProperty({
    description: 'The name of the producer',
    example: 'John Doe'
  })
  name: string

  constructor({ id, ...props }: ProducerProps) {
    super(props, id)
  }
}
