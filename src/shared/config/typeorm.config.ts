import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import envs from './envs'

const { DATABASE } = envs()

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DATABASE.host,
  port: DATABASE.port || 5432,
  username: DATABASE.username,
  password: DATABASE.password,
  database: DATABASE.database,
  synchronize: process.env.NODE_ENV === 'development',
  retryAttempts: 2
}
