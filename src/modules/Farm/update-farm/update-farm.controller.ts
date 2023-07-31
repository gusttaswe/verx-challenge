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
import { UpdateFarmUseCase } from './update-farm.usecase'
import { UpdateFarmInput, UpdateFarmOutput, UpdateFarmParams } from './update-farm.dto'
import { UpdateFarmErrorCodes } from './update-farm.error'

// Shared
import { httpExceptionHandler } from 'shared/errors/http.error'

@ApiBasicAuth()
@ApiTags('Farm')
@Controller('/farm')
export class UpdateFarmController {
  constructor(private readonly updateFarmUseCase: UpdateFarmUseCase) {}

  @Put('/:id')
  @ApiOperation({
    operationId: 'UpdateFarm',
    summary: 'UpdateFarm',
    description: 'Update a Farm'
  })
  @ApiResponse({
    status: HttpStatus[UpdateFarmErrorCodes.CULTURE_NOT_FOUND.status],
    description: UpdateFarmErrorCodes.CULTURE_NOT_FOUND.message
  })
  @ApiResponse({
    status: HttpStatus[UpdateFarmErrorCodes.FARM_NOT_FOUND.status],
    description: UpdateFarmErrorCodes.FARM_NOT_FOUND.message
  })
  @ApiResponse({
    status: HttpStatus[UpdateFarmErrorCodes.INSUFFICIENT_FARM_AREA.status],
    description: UpdateFarmErrorCodes.INSUFFICIENT_FARM_AREA.message
  })
  @ApiResponse({
    status: HttpStatus[UpdateFarmErrorCodes.UNABLE_TO_UPDATE_FARM.status],
    description: UpdateFarmErrorCodes.UNABLE_TO_UPDATE_FARM.message
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Update a Farm',
    type: UpdateFarmOutput
  })
  async handler(
    @Res() res: Response,
    @Param() param: UpdateFarmParams,
    @Body() body: UpdateFarmInput
  ) {
    const result = await this.updateFarmUseCase.execute({ id: param.id, ...body })
    if (result.isErr()) throw httpExceptionHandler(result.error)

    return res.status(HttpStatus.OK).send(result.value)
  }
}
