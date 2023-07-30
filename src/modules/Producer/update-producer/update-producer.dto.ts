import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IsString, IsOptional, IsUUID } from 'class-validator'
import { UUID } from 'crypto'

// Domains
import { Producer } from 'domains/producer.entity'

export class UpdateProducerInput extends PartialType(
  OmitType(Producer, ['farms', 'created_at', 'updated_at'] as const)
) {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  document?: string
}

export class UpdateProducerParams {
  @ApiProperty({
    description: 'Producer id',
    example: '7790e0d4-9e93-4575-bf8d-ae091db3c804'
  })
  @IsUUID()
  id: UUID
}

export class UpdateProducerOutput extends OmitType(Producer, ['farms'] as const) {}
