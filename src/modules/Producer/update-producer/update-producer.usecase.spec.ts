import { Test, TestingModule } from '@nestjs/testing'
import { Err } from 'neverthrow'
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

// DTOS
import { UpdateProducerParams, UpdateProducerInput } from './update-producer.dto'

type UpdateProducerRequest = UpdateProducerParams & UpdateProducerInput

const PRODUCER_MOCKED: Producer = {
  id: randomUUID(),
  document: faker.br.cnpj(),
  name: faker.name.firstName()
}

describe('UpdateProducer', () => {
  let createProducerUseCase: UpdateProducerUseCase
  let inMemoryProducerRepository: IProducerRepository

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

    // Mock in-memory-data
    inMemoryProducerRepository['producers'].push({ ...PRODUCER_MOCKED })
  })

  it('Should be able to update a Producer Successfully', async () => {
    const payload: UpdateProducerRequest = {
      id: PRODUCER_MOCKED.id,
      name: faker.name.firstName(), // Changed
      document: faker.br.cpf() // Changed
    }

    const result = await createProducerUseCase.execute(payload)
    const resultValue = result._unsafeUnwrap()

    expect(result.isOk()).toBe(true)
    expect(resultValue.id).toEqual(payload.id)
    expect(resultValue.name).toEqual(payload.name)
    expect(resultValue.document).toEqual(payload.document)
  })

  it('Should return an error if the document provided is invalid', async () => {
    const payload: UpdateProducerRequest = {
      id: PRODUCER_MOCKED.id,
      document: 'INVALID_DOCUMENT'
    }

    const result = await createProducerUseCase.execute(payload)
    expect(result).toEqual(new Err(UpdateProducerError.InvalidDocument()))
  })

  it('Should return an error if the producer is not found', async () => {
    const payload: UpdateProducerRequest = {
      id: randomUUID(),
      document: faker.br.cnpj()
    }

    const result = await createProducerUseCase.execute(payload)
    expect(result).toEqual(new Err(UpdateProducerError.ProducerNotFound()))
  })

  it('Should return an error if the update fails', async () => {
    jest
      .spyOn(inMemoryProducerRepository, 'update')
      .mockImplementation(async () => new Err(Error('Unable to update producer')))

    const payload: UpdateProducerRequest = {
      id: PRODUCER_MOCKED.id,
      document: faker.br.cnpj()
    }

    const result = await createProducerUseCase.execute(payload)
    expect(result).toEqual(new Err(UpdateProducerError.UnableToUpdateProducer()))
  })
})
