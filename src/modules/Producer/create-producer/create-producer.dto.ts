import { ApiProperty, OmitType } from '@nestjs/swagger'

// Domains
import { Producer } from 'domains/producer.domain'
import { Farm } from 'domains/farm.domain'
import { Address } from 'domains/address.domain'
import { Culture } from 'domains/culture.domain'

class ProducerFarm extends OmitType(Farm, [
  'id',
  'address',
  'plantedCultures'
] as const) {
  address: Omit<Address, 'id'>
  plantedCultures: Omit<Culture, 'id'>[]
}

export class CreateProducerInput {
  producer: Omit<Producer, 'id' | 'document'> & { document: string }
  farm: ProducerFarm
}

export class CreateProducerOutput {
  @ApiProperty({
    description: 'Instance of a Producer',
    type: Producer
  })
  producer: Producer

  @ApiProperty({
    description: 'Instance of a Farm',
    type: Farm
  })
  farm: Farm
}
