import { EntitySchema } from 'typeorm'
import { Address } from './address.entity'

export const AddressSchema = new EntitySchema<Address>({
  name: 'Address',
  target: Address,
  columns: {
    id: {
      type: 'uuid',
      primary: true
    },
    city: {
      type: String
    },
    state: {
      type: String
    }
  }
})
