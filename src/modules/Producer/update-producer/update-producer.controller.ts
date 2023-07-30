import { Controller, Res, HttpStatus, Body, Put, Param } from '@nestjs/common'
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBasicAuth
} from '@nestjs/swagger'
import { Response } from 'express'

// Module
import { UpdateProducerUseCase } from './update-producer.usecase'
import {
  UpdateProducerInput,
  UpdateProducerOutput,
  UpdateProducerParams
} from './update-producer.dto'
import { UpdateProducerErrorCodes } from './update-producer.error'

// Shared
import { httpExceptionHandler } from 'shared/errors/http.error'

@ApiBasicAuth()
@ApiTags('Producer')
@Controller('/producer')
export class UpdateProducerController {
  constructor(private readonly updateProducerUseCase: UpdateProducerUseCase) {}

  @Put('/:id')
  @ApiOperation({
    operationId: 'UpdateProducer',
    summary: 'UpdateProducer',
    description: 'Update a Producer'
  })
  @ApiResponse({
    status: HttpStatus[UpdateProducerErrorCodes.INVALID_DOCUMENT.status],
    description: UpdateProducerErrorCodes.INVALID_DOCUMENT.message
  })
  @ApiResponse({
    status: HttpStatus[UpdateProducerErrorCodes.PRODUCER_NOT_FOUND.status],
    description: UpdateProducerErrorCodes.PRODUCER_NOT_FOUND.message
  })
  @ApiResponse({
    status: HttpStatus[UpdateProducerErrorCodes.UNABLE_TO_UPDATE_PRODUCER.status],
    description: UpdateProducerErrorCodes.UNABLE_TO_UPDATE_PRODUCER.message
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Update a Producer',
    type: UpdateProducerOutput
  })
  async handler(
    @Res() res: Response,
    @Param() param: UpdateProducerParams,
    @Body() body: UpdateProducerInput
  ) {
    const result = await this.updateProducerUseCase.execute({ id: param.id, ...body })
    if (result.isErr()) throw httpExceptionHandler(result.error)

    return res.status(HttpStatus.OK).send(result.value)
  }
}
