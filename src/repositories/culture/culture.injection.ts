import { Provider } from '@nestjs/common'
import { ICultureRepository } from './culture.contract'
import { PostgresCultureRepository } from './implementations/postgres/culture.postgres'

export const CultureRepositoryInjection: Provider = {
  provide: ICultureRepository,
  useClass: PostgresCultureRepository
}
