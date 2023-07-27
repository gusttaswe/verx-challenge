import { HttpStatusName } from 'shared/config/http-status.config'
import { ApplicationError } from 'shared/errors/application.error'

export class CreateProducerError extends ApplicationError {
  static InvalidDocument() {
    return new CreateProducerError(CreateProducerErrorCodes.INVALID_DOCUMENT)
  }

  static InsufficientFarmArea() {
    return new CreateProducerError(
      CreateProducerErrorCodes.INSUFFICIENT_FARM_AREA
    )
  }
}

export const CreateProducerErrorCodes = {
  INVALID_DOCUMENT: {
    code: '@Producer/create-producer-document-not-valid',
    message:
      'The Document provided is not valid! Check the document and try again.',
    status: HttpStatusName.UNPROCESSABLE_ENTITY
  },
  INSUFFICIENT_FARM_AREA: {
    code: '@Producer/create-producer-insufficient-area',
    message:
      'Total area should be greater than or equal to the sum of cultivable and vegetation area.',
    status: HttpStatusName.UNPROCESSABLE_ENTITY
  }
}
