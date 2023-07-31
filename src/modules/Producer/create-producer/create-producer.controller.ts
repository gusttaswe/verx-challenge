import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common'
import {
  ApiBasicAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { Response } from 'express'

// Module
import { CreateProducerUseCase } from './create-producer.usecase'
import { CreateProducerInput, CreateProducerOutput } from './create-producer.dto'
import { CreateProducerErrorCodes } from './create-producer.error'

// Shared
import { httpExceptionHandler } from 'shared/errors/http.error'

@ApiBasicAuth()
@ApiTags('Producer')
@Controller('/producer')
export class CreateProducerController {
  constructor(private readonly createProducerUseCase: CreateProducerUseCase) {}

  @Post()
  @ApiOperation({
    operationId: 'CreateProducer',
    summary: 'CreateProducer',
    description: 'Creates a Producer'
  })
  @ApiResponse({
    status: HttpStatus[CreateProducerErrorCodes.INVALID_DOCUMENT.status],
    description: CreateProducerErrorCodes.INVALID_DOCUMENT.message
  })
  @ApiResponse({
    status: HttpStatus[CreateProducerErrorCodes.INVALID_ADDRESS.status],
    description: CreateProducerErrorCodes.INVALID_ADDRESS.message
  })
  @ApiResponse({
    status: HttpStatus[CreateProducerErrorCodes.INVALID_PRODUCER.status],
    description: CreateProducerErrorCodes.INVALID_PRODUCER.message
  })
  @ApiResponse({
    status: HttpStatus[CreateProducerErrorCodes.INSUFFICIENT_FARM_AREA.status],
    description: CreateProducerErrorCodes.INSUFFICIENT_FARM_AREA.message
  })
  @ApiResponse({
    status: HttpStatus[CreateProducerErrorCodes.CULTURE_NOT_FOUND.status],
    description: CreateProducerErrorCodes.CULTURE_NOT_FOUND.message
  })
  @ApiResponse({
    status: HttpStatus[CreateProducerErrorCodes.PRODUCER_ALREADY_EXISTS.status],
    description: CreateProducerErrorCodes.PRODUCER_ALREADY_EXISTS.message
  })
  @ApiResponse({
    status: HttpStatus[CreateProducerErrorCodes.UNABLE_TO_CREATE_PRODUCER.status],
    description: CreateProducerErrorCodes.UNABLE_TO_CREATE_PRODUCER.message
  })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Create a new Producer',
    type: CreateProducerOutput
  })
  async handler(@Res() res: Response, @Body() body: CreateProducerInput) {
    const result = await this.createProducerUseCase.execute(body)
    if (result.isErr()) throw httpExceptionHandler(result.error)

    return res.status(HttpStatus.CREATED).send(result.value)
  }
}
