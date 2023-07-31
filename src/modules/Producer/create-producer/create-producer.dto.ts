import { ApiProperty, OmitType } from '@nestjs/swagger'
import { ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

// Domains
import { Producer } from 'domains/producer.entity'
import { Farm } from 'domains/farm.entity'
import { Address } from 'domains/address.entity'
import { Culture, cultureTypes } from 'domains/culture.entity'

class CreateAddress extends OmitType(Address, ['id', 'created_at', 'updated_at'] as const) {}
class CreateCulture extends OmitType(Culture, ['id', 'created_at', 'updated_at'] as const) {}

const produceFarmOmit = [
  'id',
  'address',
  'cultures',
  'producer',
  'created_at',
  'updated_at'
] as const

class ProducerFarm extends OmitType(Farm, produceFarmOmit) {
  @ApiProperty({
    type: CreateAddress
  })
  @ValidateNested()
  @Type(() => CreateAddress)
  address: CreateAddress

  @ApiProperty({
    example: [{ name: cultureTypes.ALGODAO }],
    type: CreateCulture
  })
  @ValidateNested()
  @Type(() => CreateCulture)
  cultures: CreateCulture[]
}

const createProducerOmit = ['id', 'farms', 'created_at', 'updated_at'] as const
export class CreateProducerInput extends OmitType(Producer, createProducerOmit) {
  @ApiProperty({
    type: ProducerFarm
  })
  @ValidateNested()
  @Type(() => ProducerFarm)
  farm: ProducerFarm
}

export class CreateProducerOutput extends Producer {}
