import { Provider } from '@nestjs/common'
import { IAddressRepository } from './address.contract'
import { PostgresAddressRepository } from './implementations/postgres/address.postgres'

export const AdressRepositoryInjection: Provider = {
  provide: IAddressRepository,
  useClass: PostgresAddressRepository
}
