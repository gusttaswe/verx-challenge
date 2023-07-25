import { Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

// Module
import { CreateProducerUseCase } from './create-producer.usecase'

@ApiTags('Producer')
@Controller('/')
export class CreateProducerController {
  constructor(private readonly createProducerUseCase: CreateProducerUseCase) {}

  @Post()
  async handler() {
    await this.createProducerUseCase.execute()
  }
}
