import { OmitType } from '@nestjs/swagger'

// Domains
import { Producer } from 'domains/producer.entity'
import { Farm } from 'domains/farm.entity'
import { Address } from 'domains/address.entity'
import { Culture } from 'domains/culture.entity'

class ProducerFarm extends OmitType(Farm, ['id', 'address', 'cultures', 'producer'] as const) {
  address: Omit<Address, 'id'>
  cultures: Omit<Culture, 'id'>[]
}

export class CreateProducerInput extends OmitType(Producer, ['id', 'farms'] as const) {
  farm: ProducerFarm
}

export class CreateProducerOutput extends Producer {}
