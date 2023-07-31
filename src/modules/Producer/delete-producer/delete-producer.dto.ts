import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsUUID } from 'class-validator'
import { UUID } from 'crypto'

export class DeleteProducerParams {
  @ApiProperty({
    description: 'Producer id',
    example: '7790e0d4-9e93-4575-bf8d-ae091db3c804'
  })
  @IsUUID()
  id: UUID
}
