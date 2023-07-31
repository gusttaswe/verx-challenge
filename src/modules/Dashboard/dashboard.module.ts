import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Controllers
import { GetSummaryController } from './get-summary/get-summary.controller'

// UseCases
import { GetSummaryUseCase } from './get-summary/get-summary.usecase'

// Injections
import { FarmRepositoryInjection } from 'repositories/farm/farm.injection'

// Schemas
import { Producer } from 'domains/producer.entity'
import { Farm } from 'domains/farm.entity'
import { Culture } from 'domains/culture.entity'
import { Address } from 'domains/address.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Address, Culture, Farm, Producer])],
  controllers: [GetSummaryController],
  providers: [GetSummaryUseCase, FarmRepositoryInjection]
})
export class DashboardModule {}
