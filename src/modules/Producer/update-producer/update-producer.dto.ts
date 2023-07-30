import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'

// Domains
import { Producer } from 'domains/producer.entity'

export class UpdateProducerInput extends PartialType(OmitType(Producer, ['farms'] as const)) {}

export class UpdateProducerOutput extends OmitType(Producer, ['farms'] as const) {}
