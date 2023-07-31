import { HttpStatusName } from 'shared/config/http-status.config'
import { ApplicationError } from 'shared/errors/application.error'

export class UpdateFarmError extends ApplicationError {
  static FarmNotFound() {
    return new UpdateFarmError(UpdateFarmErrorCodes.FARM_NOT_FOUND)
  }

  static CultureNotFound() {
    return new UpdateFarmError(UpdateFarmErrorCodes.CULTURE_NOT_FOUND)
  }

  static UnableToUpdateFarm() {
    return new UpdateFarmError(UpdateFarmErrorCodes.UNABLE_TO_UPDATE_FARM)
  }

  static InsufficientFarmArea() {
    return new UpdateFarmError(UpdateFarmErrorCodes.INSUFFICIENT_FARM_AREA)
  }
}

export const UpdateFarmErrorCodes = {
  FARM_NOT_FOUND: {
    code: '@Farm/update-farm-farm-not-found',
    message: 'Unable to update Farm. Farm does not exists!',
    status: HttpStatusName.NOT_FOUND
  },
  CULTURE_NOT_FOUND: {
    code: '@Farm/create-farm-culture-not-found',
    message: 'Unable to update Farm. Culture not found!',
    status: HttpStatusName.NOT_FOUND
  },
  UNABLE_TO_UPDATE_FARM: {
    code: '@Farm/update-farm-invalid-farm',
    message: 'Something went wrong. Unable to update Farm!',
    status: HttpStatusName.BAD_REQUEST
  },
  INSUFFICIENT_FARM_AREA: {
    code: '@Farm/update-farm-insufficient-area',
    message:
      'Total area should be greater than or equal to the sum of cultivable and vegetation area.',
    status: HttpStatusName.UNPROCESSABLE_ENTITY
  }
}
