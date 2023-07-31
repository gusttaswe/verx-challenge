import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { CreateProducerController } from './create-producer/create-producer.controller'
import { UpdateProducerController } from './update-producer/update-producer.controller'
import { DeleteProducerController } from './delete-producer/delete-producer.controller'

// UseCases
import { CreateProducerUseCase } from './create-producer/create-producer.usecase'
import { UpdateProducerUseCase } from './update-producer/update-producer.usecase'
import { DeleteProducerUseCase } from './delete-producer/delete-producer.usecase'

// Injections
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
  controllers: [CreateProducerController, UpdateProducerController, DeleteProducerController],
  providers: [
    CreateProducerUseCase,
    UpdateProducerUseCase,
    DeleteProducerUseCase,
    CultureRepositoryInjection,
    FarmRepositoryInjection,
    ProducerRepositoryInjection,
    AdressRepositoryInjection
  ]
})
export class ProducerModule {}
