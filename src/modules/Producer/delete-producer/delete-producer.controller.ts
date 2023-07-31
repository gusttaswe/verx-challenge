import { Controller, Delete, Res, HttpStatus, Param } from '@nestjs/common'
import {
  ApiBasicAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { Response } from 'express'

// Module
import { DeleteProducerUseCase } from './delete-producer.usecase'
import { DeleteProducerParams } from './delete-producer.dto'
import { DeleteProducerErrorCodes } from './delete-producer.error'

// Shared
import { httpExceptionHandler } from 'shared/errors/http.error'

@ApiBasicAuth()
@ApiTags('Producer')
@Controller('/producer')
export class DeleteProducerController {
  constructor(private readonly deleteProducerUseCase: DeleteProducerUseCase) {}

  @Delete(':id')
  @ApiOperation({
    operationId: 'DeleteProducer',
    summary: 'DeleteProducer',
    description: 'Delete a Producer'
  })
  @ApiResponse({
    status: HttpStatus[DeleteProducerErrorCodes.PRODUCER_NOT_FOUND.status],
    description: DeleteProducerErrorCodes.PRODUCER_NOT_FOUND.message
  })
  @ApiResponse({
    status: HttpStatus[DeleteProducerErrorCodes.UNABLE_TO_DELETE.status],
    description: DeleteProducerErrorCodes.UNABLE_TO_DELETE.message
  })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Delete a Producer'
  })
  async handler(@Res() res: Response, @Param() params: DeleteProducerParams) {
    const result = await this.deleteProducerUseCase.execute(params)
    if (result.isErr()) throw httpExceptionHandler(result.error)

    return res.status(HttpStatus.CREATED).send(result.value)
  }
}
