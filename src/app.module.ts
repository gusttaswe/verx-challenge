import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

// Modules
import { ProducerModule } from 'modules/Producer/producer.module'

// Middlewares
import { AuthGuard } from 'shared/middlewares/auth.guard'

// Envs
import envs from 'shared/config/envs'

@Global()
@Module({
  imports: [
    ProducerModule,
    ConfigModule.forRoot({
      load: [envs],
      isGlobal: true
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
