import { EntitySchema } from 'typeorm'
import { Producer } from './producer.entity'

export const ProducerSchema = new EntitySchema<Producer>({
  name: 'Producer',
  target: Producer,
  columns: {
    id: {
      type: 'uuid',
      primary: true
    },
    name: {
      type: String
    },
    document: {
      type: String
    }
  }
})
