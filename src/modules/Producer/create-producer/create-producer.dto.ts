import { ApiProperty, OmitType } from '@nestjs/swagger'

// Domains
import { Producer } from 'domains/producer.entity'
import { Farm } from 'domains/farm.entity'
import { Address } from 'domains/address.entity'
import { Culture, cultureTypes } from 'domains/culture.entity'

class ProducerFarm extends OmitType(Farm, ['id', 'address', 'cultures', 'producer'] as const) {
  @ApiProperty({
    type: OmitType(Address, ['id'] as const)
  })
  address: Omit<Address, 'id'>

  @ApiProperty({
    example: [{ name: cultureTypes.ALGODAO }],
    type: Culture
  })
  cultures: Omit<Culture, 'id'>[]
}

export class CreateProducerInput extends OmitType(Producer, ['id', 'farms'] as const) {
  @ApiProperty({
    type: ProducerFarm
  })
  farm: ProducerFarm
}

export class CreateProducerOutput extends Producer {}
