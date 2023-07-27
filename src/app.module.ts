import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

// Modules
import { ProducerModule } from 'modules/Producer/producer.module'

// Middlewares
import { AuthGuard } from 'shared/middlewares/auth.guard'

// Envs
import envs from 'shared/config/envs'
import { TypeORMConfig } from 'shared/config/typeorm.config'

@Global()
@Module({
  imports: [
    ProducerModule,
    ConfigModule.forRoot({
      load: [envs],
      isGlobal: true
    }),
    TypeOrmModule.forRoot(TypeORMConfig)
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
