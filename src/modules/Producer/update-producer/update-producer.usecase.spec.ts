import { Test, TestingModule } from '@nestjs/testing'
import { Err, Ok } from 'neverthrow'
import { randomUUID } from 'crypto'
import faker from 'faker-br'

// Moduke
import { UpdateProducerUseCase } from './update-producer.usecase'
import { UpdateProducerError } from './update-producer.error'

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
import { Producer } from 'domains/producer.entity'
import { Address } from 'domains/address.entity'
import { Culture, cultureTypes } from 'domains/culture.entity'
import { Farm } from 'domains/farm.entity'

// DTOS
import { UpdateProducerInput, UpdateProducerOutput } from './update-producer.dto'

const PRODUCER_MOCKED: Producer = {
  id: randomUUID(),
  document: faker.br.cnpj(),
  name: faker.name.firstName()
}

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
  cultures: [
    { id: randomUUID(), name: cultureTypes.MILHO },
    { id: randomUUID(), name: cultureTypes.CAFE }
  ]
}

describe('UpdateProducer', () => {
  let createProducerUseCase: UpdateProducerUseCase
  let inMemoryProducerRepository: IProducerRepository
  let inMemoryFarmRepository: IFarmRepository

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProducerUseCase,
        {
          provide: IProducerRepository,
          useClass: InMemoryProducerRepository
        },
        {
          provide: IAddressRepository,
          useClass: InMemoryAddressRepository
        },
        {
          provide: ICultureRepository,
          useClass: InMemoryCultureRepository
        },
        {
          provide: IFarmRepository,
          useClass: InMemoryFarmRepository
        }
      ]
    }).compile()

    createProducerUseCase = moduleRef.get<UpdateProducerUseCase>(UpdateProducerUseCase)
    inMemoryProducerRepository = moduleRef.get<IProducerRepository>(IProducerRepository)
    inMemoryFarmRepository = moduleRef.get<IFarmRepository>(IFarmRepository)

    // Mock in-memory-data
    inMemoryFarmRepository['farms'].push(FARM_MOCKED)
    inMemoryProducerRepository['producers'].push(PRODUCER_MOCKED)
  })

  it('Should be able to update a Producer Successfully', async () => {
    const payload: UpdateProducerInput = {
      producer: {
        id: PRODUCER_MOCKED.id,
        name: faker.name.firstName() // Changed
      },
      farm: {
        ...FARM_MOCKED,
        address: {
          ...FARM_MOCKED.address,
          city: 'Mogi das Cruzes' // Changed
        },
        name: 'Gustavo Mata', // Changed
        totalArea: 100 // Changed
      }
    }

    const result = await createProducerUseCase.execute(payload)

    const resultValue = result._unsafeUnwrap()
    expect(resultValue.id).toEqual(payload.producer.id)
    expect(resultValue.name).toEqual(payload.producer.name)
    expect(resultValue.document).toEqual(PRODUCER_MOCKED.document)
    expect(resultValue.farms[0].name).toEqual(payload.farm.name)
    expect(resultValue.farms[0].totalArea).toEqual(payload.farm.totalArea)
    expect(resultValue.farms[0].address.city).toEqual(payload.farm.address.city)
  })

  // it('Should NOT be able to create a Producer with a incorrect Document', async () => {
  //   const createProducerMockInvalidDocument: UpdateProducerInput = {
  //     ...updateProducerInputMock,
  //     document: 'INVALID_DOCUMENT'
  //   }

  //   const result = await createProducerUseCase.execute(createProducerMockInvalidDocument)
  //   expect(result.isErr()).toBe(true)
  //   expect(result).toEqual(new Err(UpdateProducerError.InvalidDocument()))
  // })

  // it('Should allow creating a farm when the total area is greater than or equal to the sum of cultivable and vegetation area', async () => {
  //   const createProducerMock: UpdateProducerInput = {
  //     ...updateProducerInputMock,
  //     farm: {
  //       ...updateProducerInputMock.farm,
  //       totalArea: 20,
  //       cultivableArea: 12,
  //       vegetationArea: 3
  //     }
  //   }

  //   const result = await createProducerUseCase.execute(createProducerMock)
  //   expect(result.isOk()).toBe(true)
  // })

  // it('Should throw an error when the sum of the cultivable and vegetation area is greater than the farm total area', async () => {
  //   const createProducerMock: UpdateProducerInput = {
  //     ...updateProducerInputMock,
  //     farm: {
  //       ...updateProducerInputMock.farm,
  //       totalArea: 10,
  //       cultivableArea: 12,
  //       vegetationArea: 3
  //     }
  //   }

  //   const result = await createProducerUseCase.execute(createProducerMock)
  //   expect(result.isErr()).toBe(true)
  //   expect(result).toEqual(new Err(UpdateProducerError.InsufficientFarmArea()))
  // })

  // it('Should allow creating a producer with multiple planted cultures', async () => {
  //   const result = await createProducerUseCase.execute(updateProducerInputMock)
  //   const resultValue = result._unsafeUnwrap()
  //   expect(result.isOk()).toBe(true)
  //   expect(resultValue.farms[0]).toHaveProperty('cultures')
  //   expect(resultValue.farms[0].cultures.length).toBeGreaterThan(1)
  // })

  // it('Should throw an error creating a producer with a invalid culture', async () => {
  //   const createProducerMockInvalidCulture: UpdateProducerInput = updateProducerInputMock
  //   createProducerMockInvalidCulture.farm.cultures = [{ name: 'INVALID_CULTURE' }]

  //   const result = await createProducerUseCase.execute(createProducerMockInvalidCulture)
  //   expect(result.isOk()).toBe(false)
  //   expect(result).toEqual(new Err(UpdateProducerError.CultureNotFound()))
  // })

  // it('Should not be able to create two Producers with the same Document ', async () => {
  //   const result = await createProducerUseCase.execute(updateProducerInputMock)
  //   expect(result.isOk()).toBe(true)

  //   expect(await createProducerUseCase.execute(updateProducerInputMock)).toEqual(
  //     new Err(UpdateProducerError.ProducerAlreadyExists())
  //   )
  // })
})
