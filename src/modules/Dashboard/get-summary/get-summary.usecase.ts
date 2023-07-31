import { Injectable } from '@nestjs/common'
import { Ok, Err, Result } from 'neverthrow'

// Repositories
import { IFarmRepository } from 'repositories/farm/farm.contract'

// Module
import { UseCase } from 'shared/core/usecase'
import { GetSummaryError } from './get-summary.error'

// DTOs
import { GetSummaryOutput } from './get-summary.dto'

type GetSummaryResponse = Result<GetSummaryOutput, GetSummaryError>

@Injectable()
export class GetSummaryUseCase implements UseCase<null, GetSummaryOutput, GetSummaryError> {
  constructor(private readonly farmRepository: IFarmRepository) {}

  public async execute(): Promise<GetSummaryResponse> {
    const [
      totalFarmsOrError,
      stateDistributionOrError,
      cultureDistributionOrError,
      areaUsageOrError
    ] = await Promise.all([
      this.farmRepository.getTotalFarms(),
      this.farmRepository.getStateDistribution(),
      this.farmRepository.getCultureDistribution(),
      this.farmRepository.getAreaUsageDistribution()
    ])

    if (totalFarmsOrError.isErr()) return new Err(GetSummaryError.UnableToListFarms())
    if (stateDistributionOrError.isErr())
      return new Err(GetSummaryError.UnableToDetermineStateDistribution())

    if (cultureDistributionOrError.isErr())
      return new Err(GetSummaryError.UnableToDetermineCultureDistribution())

    if (areaUsageOrError.isErr())
      return new Err(GetSummaryError.UnableToDetermineAreaUsageDistribution())

    const { totalFarms, totalFarmArea } = totalFarmsOrError.value
    const addressStateDistribution = stateDistributionOrError.value
    const cultureDistribution = cultureDistributionOrError.value
    const areaUsageDistribution = areaUsageOrError.value

    const output: GetSummaryOutput = {
      totalFarms: totalFarms,
      totalFarmArea: totalFarmArea,
      stateDistribution: addressStateDistribution,
      areaUsageDistribution: areaUsageDistribution,
      cultureDistribution: cultureDistribution
    }

    return new Ok(output)
  }
}
