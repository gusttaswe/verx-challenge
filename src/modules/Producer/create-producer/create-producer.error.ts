import { HttpStatusName } from 'shared/config/http-status.config'
import { ApplicationError } from 'shared/errors/application.error'

export class CreateProducerError extends ApplicationError {
  static InvalidDocument() {
    return new CreateProducerError(CreateProducerErrorCodes.INVALID_DOCUMENT)
  }

  static InvalidAddress() {
    return new CreateProducerError(CreateProducerErrorCodes.INVALID_ADDRESS)
  }

  static InvalidProducer() {
    return new CreateProducerError(CreateProducerErrorCodes.INVALID_PRODUCER)
  }

  static InsufficientFarmArea() {
    return new CreateProducerError(CreateProducerErrorCodes.INSUFFICIENT_FARM_AREA)
  }

  static ProducerAlreadyExists() {
    return new CreateProducerError(CreateProducerErrorCodes.PRODUCER_ALREADY_EXISTS)
  }

  static UnableToCreateProducer() {
    return new CreateProducerError(CreateProducerErrorCodes.UNABLE_TO_CREATE_PRODUCER)
  }

  static CultureNotFound() {
    return new CreateProducerError(CreateProducerErrorCodes.CULTURE_NOT_FOUND)
  }
}

export const CreateProducerErrorCodes = {
  INVALID_DOCUMENT: {
    code: '@Producer/create-producer-invalid-document',
    message: 'The Document provided is not valid! Check the document and try again.',
    status: HttpStatusName.UNPROCESSABLE_ENTITY
  },
  INVALID_ADDRESS: {
    code: '@Producer/create-producer-invalid-address',
    message: 'The address provided is not valid!',
    status: HttpStatusName.CONFLICT
  },
  INVALID_PRODUCER: {
    code: '@Producer/create-producer-invalid-producer',
    message: 'The producer provided is not valid!',
    status: HttpStatusName.CONFLICT
  },
  UNABLE_TO_CREATE_PRODUCER: {
    code: '@Producer/create-producer-invalid-producer',
    message: 'Something went wrong. Unable to create Producer!',
    status: HttpStatusName.CONFLICT
  },
  INSUFFICIENT_FARM_AREA: {
    code: '@Producer/create-producer-insufficient-area',
    message:
      'Total area should be greater than or equal to the sum of cultivable and vegetation area.',
    status: HttpStatusName.UNPROCESSABLE_ENTITY
  },
  PRODUCER_ALREADY_EXISTS: {
    code: '@Producer/create-producer-producer-already-exists',
    message: 'Unable to create Producer. Producer Already exists!',
    status: HttpStatusName.CONFLICT
  },
  CULTURE_NOT_FOUND: {
    code: '@Producer/create-producer-culture-not-found',
    message: 'Unable to create producer, Culture not found!',
    status: HttpStatusName.CONFLICT
  }
}
