import { UUID } from 'crypto'
import { ApiProperty } from '@nestjs/swagger'
import { PrimaryGeneratedColumn, Entity } from 'typeorm'

@Entity()
export abstract class CoreEntity {
  @ApiProperty({
    description: 'Entity Id',
    example: '7790e0d4-9e93-4575-bf8d-ae091db3c804'
  })
  @PrimaryGeneratedColumn('uuid')
  readonly id: UUID
}
