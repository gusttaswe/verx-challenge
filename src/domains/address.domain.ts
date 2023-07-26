import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import { Entity } from 'shared/core/entity'

interface AddressProps {
  id?: UUID
  city: string
  state: string
}

export class Address extends Entity<AddressProps> {
  @ApiProperty({
    description: 'City Name',
    example: 'São José dos Campos'
  })
  city: string

  @ApiProperty({
    description: 'State',
    example: 'São Paulo'
  })
  state: string

  constructor({ id, ...props }: AddressProps) {
    super(props, id)
  }
}
