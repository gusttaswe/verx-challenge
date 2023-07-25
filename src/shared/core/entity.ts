import { UUID, randomUUID } from 'crypto'
import { ApiProperty } from '@nestjs/swagger'

export abstract class Entity<T> {
  @ApiProperty({
    description: 'Entity Id',
    example: '7790e0d4-9e93-4575-bf8d-ae091db3c804'
  })
  readonly id: UUID

  constructor(props: T, id?: UUID) {
    this.id = id ?? randomUUID()
    Object.assign(this, props)
  }
}
