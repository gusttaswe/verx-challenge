import { EntitySchema } from 'typeorm'
import { Culture } from './culture.entity'

export const CultureSchema = new EntitySchema<Culture>({
  name: 'Culture',
  target: Culture,
  columns: {
    id: {
      type: 'uuid',
      primary: true
    },
    name: {
      type: String
    }
  }
})
