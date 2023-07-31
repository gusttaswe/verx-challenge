import { HttpStatusName } from 'shared/config/http-status.config'
import { ApplicationError } from 'shared/errors/application.error'

export class GetSummaryError extends ApplicationError {
  static UnableToListFarms() {
    return new GetSummaryError(GetSummaryErrorCodes.UNABELE_TO_LIST_FARMS)
  }

  static UnableToDetermineStateDistribution() {
    return new GetSummaryError(GetSummaryErrorCodes.UNABELE_TO_DETERMINE_STATE_DISTRIBUTION)
  }

  static UnableToDetermineCultureDistribution() {
    return new GetSummaryError(GetSummaryErrorCodes.UNABELE_TO_LIST_FARMS)
  }

  static UnableToDetermineAreaUsageDistribution() {
    return new GetSummaryError(GetSummaryErrorCodes.UNABELE_TO_LIST_FARMS)
  }
}

export const GetSummaryErrorCodes = {
  UNABELE_TO_LIST_FARMS: {
    code: '@Dashboard/get-summary-unable-to-list-farms',
    message: 'Something went wrong. Unable to list total farms',
    status: HttpStatusName.BAD_REQUEST
  },
  UNABELE_TO_DETERMINE_STATE_DISTRIBUTION: {
    code: '@Dashboard/get-summary-unable-to-determine-state-distribution',
    message: 'Something went wrong. Unable to determine state distribution.',
    status: HttpStatusName.BAD_REQUEST
  },
  UNABELE_TO_DETERMINE_CULTURE_DISTRIBUTION: {
    code: '@Dashboard/get-summary-unable-to-determine-culture-distribution',
    message: 'Something went wrong. Unable to determine culture distribution',
    status: HttpStatusName.BAD_REQUEST
  },
  UNABELE_TO_DETERMINE_AREA_USAGE_DISTRIBUTION: {
    code: '@Dashboard/get-summary-unable-to-determine-area-usage-distribution',
    message: 'Something went wrong. Unable to determine area usage distribution.',
    status: HttpStatusName.BAD_REQUEST
  }
}
