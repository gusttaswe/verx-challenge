import { HttpStatusName } from 'shared/config/http-status.config'
import { ApplicationError } from 'shared/errors/application.error'

export class DeleteProducerError extends ApplicationError {
  static ProducerNotFound() {
    return new DeleteProducerError(DeleteProducerErrorCodes.PRODUCER_NOT_FOUND)
  }

  static UnableToDelete() {
    return new DeleteProducerError(DeleteProducerErrorCodes.UNABLE_TO_DELETE)
  }
}

export const DeleteProducerErrorCodes = {
  PRODUCER_NOT_FOUND: {
    code: '@Producer/delete-producer-producer-not-found',
    message: 'Producer Not Found!',
    status: HttpStatusName.NOT_FOUND
  },
  UNABLE_TO_DELETE: {
    code: '@Producer/delete-producer-unable-to-delete',
    message: 'Something went wrong! Unable to delete Producer!',
    status: HttpStatusName.BAD_REQUEST
  }
}
