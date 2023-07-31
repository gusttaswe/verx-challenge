import { Test, TestingModule } from '@nestjs/testing'
import { Err } from 'neverthrow'
import { randomUUID } from 'crypto'
import faker from 'faker-br'

// Moduke
import { DeleteProducerUseCase } from './delete-producer.usecase'
import { DeleteProducerError } from './delete-producer.error'

// Repository Contracts
import { IProducerRepository } from 'repositories/producer/producer.contract'

// Fakes Implementations
import { InMemoryProducerRepository } from 'repositories/producer/implementations/in-memory/producer.in-memory'

// Domains
import { Producer } from 'domains/producer.entity'

const PRODUCER_MOCKED: Producer = {
  id: randomUUID(),
  document: faker.br.cnpj(),
  name: faker.name.firstName()
}

describe('DeleteProducer', () => {
  let deleteProducerUseCase: DeleteProducerUseCase
  let inMemoryProducerRepository: IProducerRepository

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProducerUseCase,
        {
          provide: IProducerRepository,
          useClass: InMemoryProducerRepository
        }
      ]
    }).compile()

    deleteProducerUseCase = moduleRef.get<DeleteProducerUseCase>(DeleteProducerUseCase)
    inMemoryProducerRepository = moduleRef.get<IProducerRepository>(IProducerRepository)
    inMemoryProducerRepository['producers'].push(PRODUCER_MOCKED)
  })

  it('Should be able to delete a Producer Successfully', async () => {
    const result = await deleteProducerUseCase.execute({ id: PRODUCER_MOCKED.id })
    const producer = await inMemoryProducerRepository.getById(PRODUCER_MOCKED.id)
    expect(result.isOk()).toBe(true)
    expect(producer.isErr()).toBe(true)
  })

  it('Should not be able to delete an inexistent producer', async () => {
    const result = await deleteProducerUseCase.execute({ id: randomUUID() })
    expect(result.isOk()).toBe(false)
    expect(result).toEqual(new Err(DeleteProducerError.ProducerNotFound()))
  })

  it('Should return an error when delete action fails', async () => {
    jest
      .spyOn(inMemoryProducerRepository, 'delete')
      .mockImplementation(async () => new Err(Error('Unable to delete Producer!')))

    const result = await deleteProducerUseCase.execute({ id: PRODUCER_MOCKED.id })
    expect(result.isOk()).toBe(false)
    expect(result).toEqual(new Err(DeleteProducerError.UnableToDelete()))
  })
})
