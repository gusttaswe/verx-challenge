import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { UpdateFarmController } from './update-farm/update-farm.controller'

// UseCases
import { UpdateFarmUseCase } from './update-farm/update-farm.usecase'

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
  controllers: [UpdateFarmController],
  providers: [
    UpdateFarmUseCase,
    CultureRepositoryInjection,
    FarmRepositoryInjection,
    ProducerRepositoryInjection,
    AdressRepositoryInjection
  ]
})
export class FarmModule {}
