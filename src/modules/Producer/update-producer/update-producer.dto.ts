import { OmitType } from '@nestjs/swagger'
import { IsString, IsOptional, IsUUID } from 'class-validator'
import { UUID } from 'crypto'

// Domains
import { Producer } from 'domains/producer.entity'

export class UpdateProducerInput {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  document?: string
}

export class UpdateProducerParams {
  @IsUUID()
  id: UUID
}

export class UpdateProducerOutput extends OmitType(Producer, ['farms'] as const) {}
