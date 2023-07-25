import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

// Envs
import envs from 'shared/config/envs'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envs],
      isGlobal: true
    })
  ]
})
export class AppModule {}
