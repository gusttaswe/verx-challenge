import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

// Modules
import { ProducerModule } from 'modules/Producer/producer.module'
import { SeederModule } from './infra/database/seeds/seed.module'

// Middlewares
import { AuthGuard } from 'shared/middlewares/auth.guard'

// Envs
import envs from 'shared/config/envs'
import { TypeORMConfig } from 'shared/config/typeorm.config'

// Schemas
import { Producer } from 'domains/producer.entity'
import { Farm } from 'domains/farm.entity'
import { Culture } from 'domains/culture.entity'
import { Address } from 'domains/address.entity'

@Global()
@Module({
  imports: [
    SeederModule,
    ProducerModule,
    ConfigModule.forRoot({
      load: [envs],
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      ...TypeORMConfig,
      entities: [Address, Culture, Farm, Producer]
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
