import { Injectable } from '@nestjs/common'
import { Ok, Err, Result } from 'neverthrow'

// Repositories
import { IFarmRepository } from 'repositories/farm/farm.contract'
import { ICultureRepository } from 'repositories/culture/culture.contract'

// Module
import { UseCase } from 'shared/core/usecase'
import { UpdateFarmError } from './update-farm.error'

// Domain Entities
import { Farm } from 'domains/farm.entity'
import { Culture } from 'domains/culture.entity'

// DTOs
import { UpdateFarmInput, UpdateFarmOutput, UpdateFarmParams } from './update-farm.dto'

type UpdateFarmRequest = UpdateFarmParams & UpdateFarmInput
type UpdateFarmResponse = Result<UpdateFarmOutput, UpdateFarmError>

@Injectable()
export class UpdateFarmUseCase
  implements UseCase<UpdateFarmRequest, UpdateFarmOutput, UpdateFarmError>
{
  constructor(
    private readonly farmRepository: IFarmRepository,
    private readonly cultureRepository: ICultureRepository
  ) {}

  public async execute({
    address: inputAddress,
    cultures: inputCultures,
    ...farmInput
  }: UpdateFarmRequest): Promise<UpdateFarmResponse> {
    const farmResult = await this.farmRepository.getById(farmInput.id)
    if (farmResult.isErr()) return new Err(UpdateFarmError.FarmNotFound())
    const farm: Farm = Object.assign(farmResult.value, farmInput)

    if (Farm.isTotalAreaInsufficient(farm))
      return new Err(UpdateFarmError.InsufficientFarmArea())

    if (inputCultures && !!inputCultures.length) {
      const cultureResults = await Promise.all(
        inputCultures.map(({ name }) => this.cultureRepository.getByName(name))
      )
      const invalidCultureResult = cultureResults.some((result) => result.isErr())
      if (invalidCultureResult) return new Err(UpdateFarmError.CultureNotFound())
      const cultures: Culture[] = cultureResults.map((result) => result.isOk() && result.value)
      farm.cultures = cultures
    }

    if (inputAddress) Object.assign(farm.address, inputAddress)

    const farmOrError = await this.farmRepository.update(farm)
    if (farmOrError.isErr()) return new Err(UpdateFarmError.UnableToUpdateFarm())
    return new Ok(farmOrError.value)
  }
}
