import { Test, TestingModule } from '@nestjs/testing'
import faker from 'faker-br'
import { Err } from 'neverthrow'

// Moduke
import { CreateProducerUseCase } from './create-producer.usecase'
import { CreateProducerError } from './create-producer.error'

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
import { CreateProducerInput, CreateProducerOutput } from './create-producer.dto'

describe('CreateProducer', () => {
  let createProducerUseCase: CreateProducerUseCase
  let createProducerInputMock: CreateProducerInput

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProducerUseCase,
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

    createProducerUseCase = moduleRef.get<CreateProducerUseCase>(CreateProducerUseCase)

    createProducerInputMock = {
      document: faker.br.cnpj(),
      name: faker.name.firstName(),
      farm: {
        name: faker.company.companyName(),
        totalArea: 15,
        cultivableArea: 12,
        vegetationArea: 3,
        address: {
          city: faker.address.city(),
          state: faker.address.state()
        },
        cultures: [{ name: cultureTypes.MILHO }, { name: cultureTypes.CAFE }]
      }
    }
  })

  it('Should be able to create a Producer Successfully', async () => {
    const result = await createProducerUseCase.execute(createProducerInputMock)
    const resultValue: CreateProducerOutput = result._unsafeUnwrap()

    expect(result.isOk()).toBe(true)

    expect(resultValue).toBeInstanceOf(Producer)
    expect(resultValue).toHaveProperty('id')

    const [farm] = resultValue.farms
    expect(farm).toBeInstanceOf(Farm)
    expect(farm).toHaveProperty('id')

    expect(farm.address).toBeInstanceOf(Address)
    expect(farm.address).toHaveProperty('id')

    farm.cultures.forEach((culture) => {
      expect(culture).toBeInstanceOf(Culture)
      expect(culture).toHaveProperty('id')
    })
  })

  it('Should NOT be able to create a Producer with a incorrect Document', async () => {
    const createProducerMockInvalidDocument: CreateProducerInput = {
      ...createProducerInputMock,
      document: 'INVALID_DOCUMENT'
    }

    const result = await createProducerUseCase.execute(createProducerMockInvalidDocument)
    expect(result.isErr()).toBe(true)
    expect(result).toEqual(new Err(CreateProducerError.InvalidDocument()))
  })

  it('Should allow creating a farm when the total area is greater than or equal to the sum of cultivable and vegetation area', async () => {
    const createProducerMock: CreateProducerInput = {
      ...createProducerInputMock,
      farm: {
        ...createProducerInputMock.farm,
        totalArea: 20,
        cultivableArea: 12,
        vegetationArea: 3
      }
    }

    const result = await createProducerUseCase.execute(createProducerMock)
    expect(result.isOk()).toBe(true)
  })

  it('Should throw an error when the sum of the cultivable and vegetation area is greater than the farm total area', async () => {
    const createProducerMock: CreateProducerInput = {
      ...createProducerInputMock,
      farm: {
        ...createProducerInputMock.farm,
        totalArea: 10,
        cultivableArea: 12,
        vegetationArea: 3
      }
    }

    const result = await createProducerUseCase.execute(createProducerMock)
    expect(result.isErr()).toBe(true)
    expect(result).toEqual(new Err(CreateProducerError.InsufficientFarmArea()))
  })

  it('Should allow creating a producer with multiple planted cultures', async () => {
    const result = await createProducerUseCase.execute(createProducerInputMock)
    const resultValue = result._unsafeUnwrap()
    expect(result.isOk()).toBe(true)
    expect(resultValue.farms[0]).toHaveProperty('cultures')
    expect(resultValue.farms[0].cultures.length).toBeGreaterThan(1)
  })

  it('Should throw an error creating a producer with a invalid culture', async () => {
    const createProducerMockInvalidCulture: CreateProducerInput = createProducerInputMock
    createProducerMockInvalidCulture.farm.cultures = [{ name: 'INVALID_CULTURE' }]

    const result = await createProducerUseCase.execute(createProducerMockInvalidCulture)
    expect(result.isOk()).toBe(false)
    expect(result).toEqual(new Err(CreateProducerError.CultureNotFound()))
  })

  it('Should not be able to create two Producers with the same Document ', async () => {
    const result = await createProducerUseCase.execute(createProducerInputMock)
    expect(result.isOk()).toBe(true)

    expect(await createProducerUseCase.execute(createProducerInputMock)).toEqual(
      new Err(CreateProducerError.ProducerAlreadyExists())
    )
  })
})
