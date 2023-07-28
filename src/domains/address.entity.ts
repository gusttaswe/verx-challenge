import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import { CoreEntity } from 'shared/core/entity'
import { Column, Entity } from 'typeorm'

interface AddressProps {
  city: string
  state: string
}

@Entity()
export class Address extends CoreEntity<AddressProps> {
  constructor(props: AddressProps, id?: UUID) {
    super(props, id)
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
