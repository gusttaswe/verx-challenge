import { randomUUID } from 'crypto'
import { cultureTypes } from 'domains/culture.entity'

export const cultures = Object.values(cultureTypes).map((value: string) => ({
  id: randomUUID(),
  name: value
}))
