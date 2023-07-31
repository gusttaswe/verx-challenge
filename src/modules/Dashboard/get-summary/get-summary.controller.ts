import { Controller, Res, HttpStatus, Get } from '@nestjs/common'
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBasicAuth
} from '@nestjs/swagger'
import { Response } from 'express'

// Module
import { GetSummaryUseCase } from './get-summary.usecase'
import { GetSummaryOutput } from './get-summary.dto'
import { GetSummaryErrorCodes } from './get-summary.error'

// Shared
import { httpExceptionHandler } from 'shared/errors/http.error'

@ApiBasicAuth()
@ApiTags('Dashboard')
@Controller('/dashboard')
export class GetSummaryController {
  constructor(private readonly getSummaryUseCase: GetSummaryUseCase) {}

  @Get('/summary')
  @ApiOperation({
    operationId: 'GetSummary',
    summary: 'GetSummary',
    description: 'Get dashboard summary data'
  })
  @ApiResponse({
    status:
      HttpStatus[GetSummaryErrorCodes.UNABELE_TO_DETERMINE_AREA_USAGE_DISTRIBUTION.status],
    description: GetSummaryErrorCodes.UNABELE_TO_DETERMINE_AREA_USAGE_DISTRIBUTION.message
  })
  @ApiResponse({
    status: HttpStatus[GetSummaryErrorCodes.UNABELE_TO_DETERMINE_CULTURE_DISTRIBUTION.status],
    description: GetSummaryErrorCodes.UNABELE_TO_DETERMINE_CULTURE_DISTRIBUTION.message
  })
  @ApiResponse({
    status: HttpStatus[GetSummaryErrorCodes.UNABELE_TO_DETERMINE_STATE_DISTRIBUTION.status],
    description: GetSummaryErrorCodes.UNABELE_TO_DETERMINE_STATE_DISTRIBUTION.message
  })
  @ApiResponse({
    status: HttpStatus[GetSummaryErrorCodes.UNABELE_TO_LIST_FARMS.status],
    description: GetSummaryErrorCodes.UNABELE_TO_LIST_FARMS.message
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Update a Farm',
    type: GetSummaryOutput
  })
  async handler(@Res() res: Response) {
    const result = await this.getSummaryUseCase.execute()
    if (result.isErr()) throw httpExceptionHandler(result.error)

    return res.status(HttpStatus.OK).send(result.value)
  }
}
