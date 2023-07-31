import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IsOptional, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

import { UUID } from 'crypto'

// Domains
import { Farm } from 'domains/farm.entity'
import { Address } from 'domains/address.entity'
import { Culture, cultureTypes } from 'domains/culture.entity'

class CreateAddress extends PartialType(
  OmitType(Address, ['id', 'created_at', 'updated_at'] as const)
) {}
class CreateCulture extends PartialType(
  OmitType(Culture, ['id', 'created_at', 'updated_at'] as const)
) {}

const produceFarmOmit = [
  'id',
  'address',
  'cultures',
  'producer',
  'created_at',
  'updated_at'
] as const

export class UpdateFarmInput extends PartialType(OmitType(Farm, produceFarmOmit)) {
  @ApiProperty({
    type: CreateAddress
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateAddress)
  address?: CreateAddress

  @ApiProperty({
    example: [{ name: cultureTypes.ALGODAO }],
    type: CreateCulture
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateCulture)
  cultures?: CreateCulture[]
}

export class UpdateFarmParams {
  @ApiProperty({
    description: 'Farm id',
    example: '7790e0d4-9e93-4575-bf8d-ae091db3c804'
  })
  @IsUUID()
  id: UUID
}

export class UpdateFarmOutput extends Farm {}
