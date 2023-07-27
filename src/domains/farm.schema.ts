import { EntitySchema } from 'typeorm'
import { Farm } from './farm.entity'
import { Address } from './address.entity'

export const FarmSchema = new EntitySchema<Farm>({
  name: 'Farm',
  target: Farm,
  columns: {
    id: {
      type: 'uuid',
      primary: true
    },
    name: {
      type: String
    },
    totalArea: {
      type: Number
    },
    cultivableArea: {
      type: Number
    },
    vegetationArea: {
      type: Number
    },
    plantedCultures: {
      type: 'array'
    }
  },
  relations: {
    address: {
      type: 'one-to-one',
      target: Address
    }
  }
})
