import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

// Module
import { CreateProducerUseCase } from './create-producer.usecase'
import { CreateProducerInput, CreateProducerOutput } from './create-producer.dto'

// Shared
import { httpExceptionHandler } from 'shared/errors/http.error'

@ApiTags('Producer')
@Controller('/producer')
export class CreateProducerController {
  constructor(private readonly createProducerUseCase: CreateProducerUseCase) {}

  @Post()
  @ApiOkResponse({ description: 'Create a new Producer', type: CreateProducerOutput })
  async handler(@Body() body: CreateProducerInput, @Res() res: Response) {
    const result = await this.createProducerUseCase.execute(body)
    if (result.isErr()) throw httpExceptionHandler(result.error)

    return res.status(HttpStatus.CREATED).send(result.value)
  }
}
