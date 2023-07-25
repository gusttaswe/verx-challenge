import { Module } from '@nestjs/common'

// Controller
import { ListPostsController } from './create-producer_/create-producer.controller'

// Providers
import { ListPostsUseCase } from './create-producer_/create-producer.usecase'
import { CMSProviderInjection } from 'providers/cms/cms.injection'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [ListPostsController],
  providers: [ListPostsUseCase, CMSProviderInjection]
})
export class ProducerModule {}
