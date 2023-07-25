import { UUID, randomUUID } from 'crypto'
import { ApiProperty } from '@nestjs/swagger'

export abstract class Entity<T> {
  @ApiProperty({
    description: 'Entity Id'
  })
  readonly id: UUID

  constructor(props: T, id?: UUID) {
    this.id = id ?? randomUUID()
    Object.assign(this, props)
  }
}
