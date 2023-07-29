import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

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
  city: string

  @ApiProperty({
    description: 'State',
    example: 'São Paulo'
  })
  @Column()
  state: string
}
