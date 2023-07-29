import { Provider } from '@nestjs/common'
import { IFarmRepository } from './farm.contract'
import { PostgresFarmRepository } from './implementations/postgres/farm.postgres'

export const FarmRepositoryInjection: Provider = {
  provide: IFarmRepository,
  useClass: PostgresFarmRepository
}
