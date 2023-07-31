import { HttpStatusName } from 'shared/config/http-status.config'
import { ApplicationError } from 'shared/errors/application.error'

export class UpdateProducerError extends ApplicationError {
  static ProducerNotFound() {
    return new UpdateProducerError(UpdateProducerErrorCodes.PRODUCER_NOT_FOUND)
  }

  static InvalidDocument() {
    return new UpdateProducerError(UpdateProducerErrorCodes.INVALID_DOCUMENT)
  }

  static UnableToUpdateProducer() {
    return new UpdateProducerError(UpdateProducerErrorCodes.UNABLE_TO_UPDATE_PRODUCER)
  }
}

export const UpdateProducerErrorCodes = {
  PRODUCER_NOT_FOUND: {
    code: '@Producer/update-producer-producer-not-found',
    message: 'Unable to update Producer. Producer does not exists!',
    status: HttpStatusName.NOT_FOUND
  },
  INVALID_DOCUMENT: {
    code: '@Producer/update-producer-invalid-document',
    message: 'The Document provided is not valid! Check the document and try again.',
    status: HttpStatusName.UNPROCESSABLE_ENTITY
  },
  UNABLE_TO_UPDATE_PRODUCER: {
    code: '@Producer/update-producer-invalid-producer',
    message: 'Something went wrong. Unable to update Producer!',
    status: HttpStatusName.BAD_REQUEST
  }
}
