import { Provider } from '@nestjs/common'
import { IProducerRepository } from './producer.contract'
import { PostgresProducerRepository } from './implementations/postgres/producer.postgres'

export const ProducerRepositoryInjection: Provider = {
  provide: IProducerRepository,
  useClass: PostgresProducerRepository
}
