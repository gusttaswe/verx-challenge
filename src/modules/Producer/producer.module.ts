import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Controller
import { CreateProducerController } from './create-producer/create-producer.controller'

// Injections
import { CreateProducerUseCase } from './create-producer/create-producer.usecase'
import { CultureRepositoryInjection } from 'repositories/culture/culture.injection'
import { FarmRepositoryInjection } from 'repositories/farm/farm.injection'
import { ProducerRepositoryInjection } from 'repositories/producer/producer.injection'
import { AdressRepositoryInjection } from 'repositories/address/address.injection'

// Schemas
import { Producer } from 'domains/producer.entity'
import { Farm } from 'domains/farm.entity'
import { Culture } from 'domains/culture.entity'
import { Address } from 'domains/address.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Address, Culture, Farm, Producer])],
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
