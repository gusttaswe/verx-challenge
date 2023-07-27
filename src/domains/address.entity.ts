import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import { Entity } from 'shared/core/entity'

interface AddressProps {
  city: string
  state: string
}

export class Address extends Entity<AddressProps> {
  constructor(props: AddressProps, id?: UUID) {
    super(props, id)
  }

  @ApiProperty({
    description: 'City Name',
    example: 'São José dos Campos'
  })
  get city(): string {
    return this.props.city
  }

  @ApiProperty({
    description: 'State',
    example: 'São Paulo'
  })
  get state(): string {
    return this.props.state
  }
}
