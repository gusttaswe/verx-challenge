import { Module } from '@nestjs/common'

// Controller
import { CreateProducerController } from './create-producer/create-producer.controller'

// Providers
import { CreateProducerUseCase } from './create-producer/create-producer.usecase'
import { CultureRepositoryInjection } from 'repositories/culture/culture.injection'
import { FarmRepositoryInjection } from 'repositories/farm/farm.injection'
import { ProducerRepositoryInjection } from 'repositories/producer/producer.injection'
import { AdressRepositoryInjection } from 'repositories/address/address.injection'
import { ProducerSchema } from 'domains/producer.schema'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ProducerSchema])],
  controllers: [CreateProducerController],
  providers: [
    CreateProducerUseCase,
    CultureRepositoryInjection,
    FarmRepositoryInjection,
    ProducerRepositoryInjection,
    AdressRepositoryInjection
  ]
})
export class ProducerModule {}
