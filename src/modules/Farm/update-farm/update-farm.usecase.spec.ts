import { Test, TestingModule } from '@nestjs/testing'
import { Err } from 'neverthrow'
import { randomUUID } from 'crypto'
import faker from 'faker-br'

// Moduke
import { UpdateFarmUseCase } from './update-farm.usecase'
import { UpdateFarmError } from './update-farm.error'

// Repository Contracts
import { IProducerRepository } from 'repositories/producer/producer.contract'
import { IAddressRepository } from 'repositories/address/address.contract'
import { ICultureRepository } from 'repositories/culture/culture.contract'
import { IFarmRepository } from 'repositories/farm/farm.contract'

// Fakes Implementations
import { InMemoryProducerRepository } from 'repositories/producer/implementations/in-memory/producer.in-memory'
import { InMemoryAddressRepository } from 'repositories/address/implementations/in-memory/address.in-memory'
import { InMemoryCultureRepository } from 'repositories/culture/implementations/in-memory/culture.in-memory'
import { InMemoryFarmRepository } from 'repositories/farm/implementations/in-memory/farm.in-memory'

// Domains
import { Culture, cultureTypes } from 'domains/culture.entity'
import { Farm } from 'domains/farm.entity'

// DTOS
import { UpdateFarmParams, UpdateFarmInput } from './update-farm.dto'

type UpdateFarmRequest = UpdateFarmParams & UpdateFarmInput

const CULTURES_MOCK: Culture[] = [
  { id: randomUUID(), name: cultureTypes.ALGODAO },
  { id: randomUUID(), name: cultureTypes.CAFE },
  { id: randomUUID(), name: cultureTypes.CANA_DE_ACUCAR },
  { id: randomUUID(), name: cultureTypes.MILHO },
  { id: randomUUID(), name: cultureTypes.SOJA }
]

const FARM_MOCKED: Farm = {
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
}

describe('UpdateFarm', () => {
  let updateFarmUseCase: UpdateFarmUseCase
  let inMemoryFarmRepository: IFarmRepository
  let inMemoryCultureRepository: ICultureRepository

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateFarmUseCase,
        {
          provide: IFarmRepository,
          useClass: InMemoryFarmRepository
        },
        {
          provide: ICultureRepository,
          useClass: InMemoryCultureRepository
        }
      ]
    }).compile()

    updateFarmUseCase = moduleRef.get<UpdateFarmUseCase>(UpdateFarmUseCase)
    inMemoryFarmRepository = moduleRef.get<IFarmRepository>(IFarmRepository)
    inMemoryCultureRepository = moduleRef.get<ICultureRepository>(ICultureRepository)

    // Mock in-memory-data
    inMemoryFarmRepository['farms'].push({ ...FARM_MOCKED })
    inMemoryCultureRepository['cultures'].push({ ...CULTURES_MOCK })
  })

  it('Should be able to update a Farm Successfully', async () => {
    const payload: UpdateFarmRequest = {
      id: FARM_MOCKED.id,
      address: {
        city: 'City A' // Changed
      },
      name: 'Gustavo Mata', // Changed
      totalArea: 100 // Changed
    }

    const result = await updateFarmUseCase.execute(payload)
    const resultValue = result._unsafeUnwrap()

    expect(result.isOk()).toBe(true)
    expect(resultValue.address.city).toEqual('City A')
    expect(resultValue.name).toEqual('Gustavo Mata')
    expect(resultValue.totalArea).toEqual(100)
  })

  it('Should be able to update a Farm Cultures Successfully', async () => {
    const payload: UpdateFarmRequest = {
      id: FARM_MOCKED.id,
      cultures: [{ name: cultureTypes.CANA_DE_ACUCAR }]
    }

    const result = await updateFarmUseCase.execute(payload)
    const resultValue = result._unsafeUnwrap()

    expect(result.isOk()).toBe(true)
    expect(resultValue.cultures.length).toBe(1)
    resultValue.cultures.forEach((culture) => {
      expect(culture).toHaveProperty('id')
      expect(culture).toHaveProperty('name', cultureTypes.CANA_DE_ACUCAR)
    })
  })

  it('Should be able to update a Farm Address Successfully', async () => {
    const payload: UpdateFarmRequest = {
      id: FARM_MOCKED.id,
      address: {
        city: 'City A',
        state: 'State B'
      }
    }

    const result = await updateFarmUseCase.execute(payload)
    const resultValue = result._unsafeUnwrap()

    expect(result.isOk()).toBe(true)
    expect(resultValue.address).toHaveProperty('id')
    expect(resultValue.address).toHaveProperty('city', 'City A')
    expect(resultValue.address).toHaveProperty('state', 'State B')
  })

  it('Should return an error when the sum of the cultivable and vegetation area is greater than the farm total area', async () => {
    const payload: UpdateFarmRequest = {
      id: FARM_MOCKED.id,
      cultivableArea: 100
    }

    const result = await updateFarmUseCase.execute(payload)

    expect(result.isOk()).toBe(false)
    expect(result).toEqual(new Err(UpdateFarmError.InsufficientFarmArea()))
  })

  it('Should return an error when the culture provided does not exists', async () => {
    const payload: UpdateFarmRequest = {
      id: FARM_MOCKED.id,
      cultures: [{ name: 'INVALID_CULTURE' }]
    }

    const result = await updateFarmUseCase.execute(payload)
    expect(result.isOk()).toBe(false)
    expect(result).toEqual(new Err(UpdateFarmError.CultureNotFound()))
  })
})
