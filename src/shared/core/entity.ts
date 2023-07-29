import { UUID, randomUUID } from 'crypto'
import { ApiProperty } from '@nestjs/swagger'
import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export abstract class CoreEntity {
  @ApiProperty({
    description: 'Entity Id',
    example: '7790e0d4-9e93-4575-bf8d-ae091db3c804'
  })
  @PrimaryColumn('uuid')
  readonly id: UUID

  constructor() {
    this.id = randomUUID()
  }
}
