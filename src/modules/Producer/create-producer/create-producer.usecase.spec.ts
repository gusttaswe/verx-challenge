import { Test, TestingModule } from '@nestjs/testing'
import faker from 'faker-br'

// UseCase
import { CreateProducerUseCase } from './create-producer.usecase'

// Repository Contracts
import { IProducerRepository } from 'repositories/producer/producer.contract'
import { IAddressRepository } from 'repositories/address/address.contract'
import { ICultureRepository } from 'repositories/culture/culture.contract'
import { IFarmRepository } from 'repositories/farm/farm.contract'

// Fakes Implementations
import { FakeProducerRepository } from 'repositories/producer/implementations/faker/producer.faker'
import { FakeAddressRepository } from 'repositories/address/implementations/faker/address.faker'
import { FakeCultureRepository } from 'repositories/culture/implementations/faker/culture.faker'
import { FakeFarmRepository } from 'repositories/farm/implementations/faker/farm.faker'

// Domains
import { Producer } from 'domains/producer.domain'
import { Address } from 'domains/address.domain'
import { Culture, cultureTypes } from 'domains/culture.domain'
import { Farm } from 'domains/farm.domain'

// DTOS
import {
  CreateProducerInput,
  CreateProducerOutput
} from './create-producer.dto'

const PRODUCER_MOCK: Omit<Producer, 'id'> = {
  document: faker.br.cnpj(),
  name: faker.name.firstName()
}

const ADDRESS_MOCK: Omit<Address, 'id'> = {
  city: faker.address.city(),
  state: faker.address.state()
}

const CULTURE_MOCK: Omit<Culture, 'id'>[] = [
  {
    name: cultureTypes.MILHO
  },
  {
    name: cultureTypes.CAFE
  }
]

describe('CreateProducer', () => {
  let createProducerUseCase: CreateProducerUseCase
  let fakeProducerRepository: IProducerRepository

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProducerUseCase,
        {
          provide: IProducerRepository,
          useClass: FakeProducerRepository
        },
        {
          provide: IAddressRepository,
          useClass: FakeAddressRepository
        },
        {
          provide: ICultureRepository,
          useClass: FakeCultureRepository
        },
        {
          provide: IFarmRepository,
          useClass: FakeFarmRepository
        }
      ]
    }).compile()

    createProducerUseCase = moduleRef.get<CreateProducerUseCase>(
      CreateProducerUseCase
    )
    fakeProducerRepository =
      moduleRef.get<IProducerRepository>(IProducerRepository)
  })

  it('Should be able to create a Producer Successfully', async () => {
    const createProducerMock: CreateProducerInput = {
      producer: PRODUCER_MOCK,
      farm: {
        name: faker.company.companyName(),
        totalHectares: 15,
        cultivableHectares: 12,
        vegetationHectares: 3,
        address: ADDRESS_MOCK,
        plantedCultures: CULTURE_MOCK
      }
    }

    const result = await createProducerUseCase.execute(createProducerMock)

    const resultValue: CreateProducerOutput = result._unsafeUnwrap()

    expect(result.isOk()).toBe(true)

    expect(resultValue.producer).toBeInstanceOf(Producer)
    expect(resultValue.producer).toHaveProperty('id')

    expect(resultValue.farm).toBeInstanceOf(Farm)
    expect(resultValue.farm).toHaveProperty('id')

    expect(resultValue.farm.address).toBeInstanceOf(Address)
    expect(resultValue.farm.address).toHaveProperty('id')

    resultValue.farm.plantedCultures.forEach((culture) => {
      expect(culture).toBeInstanceOf(Culture)
      expect(culture).toHaveProperty('id')
    })
  })

  // it('Should NOT be able to create a Producer with a incorrect Document', async () => {})

  // it('Should allow creating a farm when the total area is greater than or equal to the sum of cultivable and vegetation area ', async () => {})

  // it('Should throw an error when the sum of the cultivable and vegetation area is greater than the farm total area', async () => {})

  // it('Should allow creating a producer with multiple planted cultures', async () => {})
})
