import { Test, TestingModule } from '@nestjs/testing'
import { Err } from 'neverthrow'
import { randomUUID } from 'crypto'
import faker from 'faker-br'

// Moduke
import { GetSummaryUseCase } from './get-summary.usecase'
import { GetSummaryError } from './get-summary.error'

// Repository Contracts
import { IFarmRepository } from 'repositories/farm/farm.contract'
import { IAddressRepository } from 'repositories/address/address.contract'

// Fakes Implementations
import { InMemoryFarmRepository } from 'repositories/farm/implementations/in-memory/farm.in-memory'

// Domains
import { Culture, cultureTypes } from 'domains/culture.entity'
import { Farm } from 'domains/farm.entity'

const CULTURES_MOCK: Culture[] = [
  { id: randomUUID(), name: cultureTypes.ALGODAO },
  { id: randomUUID(), name: cultureTypes.CAFE },
  { id: randomUUID(), name: cultureTypes.CANA_DE_ACUCAR },
  { id: randomUUID(), name: cultureTypes.MILHO },
  { id: randomUUID(), name: cultureTypes.SOJA }
]

const FARM_MOCKED = (): Farm => ({
  id: randomUUID(),
  name: faker.company.companyName(),
  totalArea: 15,
  cultivableArea: 12,
  vegetationArea: 3,
  address: {
    id: randomUUID(),
    city: faker.address.city(),
    state: faker.address.state()
  },
  cultures: [CULTURES_MOCK[0], CULTURES_MOCK[1]]
})

const MOCK_TIMES = 10

describe('GetSummary', () => {
  let getSummaryUseCase: GetSummaryUseCase
  let inMemoryFarmRepository: IFarmRepository

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GetSummaryUseCase,
        {
          provide: IFarmRepository,
          useClass: InMemoryFarmRepository
        }
      ]
    }).compile()

    getSummaryUseCase = moduleRef.get<GetSummaryUseCase>(GetSummaryUseCase)
    inMemoryFarmRepository = moduleRef.get<IFarmRepository>(IFarmRepository)

    // Mock in-memory-data
    const farmMockData = [...new Array(MOCK_TIMES)].map(() => {
      const randomIndice = Math.floor(Math.random() * CULTURES_MOCK.length)
      const randomIndice2 =
        randomIndice === CULTURES_MOCK.length - 1 ? randomIndice - 1 : randomIndice + 1
      return {
        ...FARM_MOCKED(),
        cultures: [CULTURES_MOCK[randomIndice], CULTURES_MOCK[randomIndice2]]
      }
    })

    inMemoryFarmRepository['farms'] = farmMockData
  })

  it('Should return successfully the dashboard summary data', async () => {
    const result = await getSummaryUseCase.execute()
    const resultValue = result._unsafeUnwrap()

    const totalFarmArea = 15 * MOCK_TIMES // 15 = default value for farm total area
    const totalStates = resultValue.stateDistribution.reduce(
      (acc, state) => (acc += state.count),
      0
    )

    expect(result.isOk()).toBe(true)
    expect(resultValue.totalFarmArea).toBe(totalFarmArea)
    expect(resultValue.cultureDistribution.length).toBeGreaterThan(0)
    resultValue.cultureDistribution.forEach((cultureDistribution) => {
      expect(cultureDistribution).toHaveProperty('culture')
      expect(cultureDistribution).toHaveProperty('farmsCount')
    })
    resultValue.areaUsageDistribution.forEach(({ usageType, totalArea }) => {
      expect(usageType).toMatch(/Agricultável|Vegetação/gi)
      expect(totalArea).toBeGreaterThan(0)
    })
    expect(totalStates).toBe(10)
  })

  it('Should return an Error when its not possible to fetch totalFarms', async () => {
    jest
      .spyOn(inMemoryFarmRepository, 'getTotalFarms')
      .mockImplementation(async () => new Err(Error('Unable to fetch farms')))
    const result = await getSummaryUseCase.execute()

    expect(result).toEqual(new Err(GetSummaryError.UnableToListFarms()))
  })

  it('Should return an Error when its not possible to fetch State Distribution', async () => {
    jest
      .spyOn(inMemoryFarmRepository, 'getStateDistribution')
      .mockImplementation(async () => new Err(Error('Unable to fetch state distribution')))
    const result = await getSummaryUseCase.execute()

    expect(result).toEqual(new Err(GetSummaryError.UnableToDetermineStateDistribution()))
  })

  it('Should return an Error when its not possible to fetch Culture Distribution', async () => {
    jest
      .spyOn(inMemoryFarmRepository, 'getCultureDistribution')
      .mockImplementation(async () => new Err(Error('Unable to fetch farms')))
    const result = await getSummaryUseCase.execute()

    expect(result).toEqual(new Err(GetSummaryError.UnableToDetermineCultureDistribution()))
  })

  it('Should return an Error when its not possible to fetch Area usage distribution', async () => {
    jest
      .spyOn(inMemoryFarmRepository, 'getAreaUsageDistribution')
      .mockImplementation(async () => new Err(Error('Unable to fetch farms')))
    const result = await getSummaryUseCase.execute()

    expect(result).toEqual(new Err(GetSummaryError.UnableToDetermineAreaUsageDistribution()))
  })
})
