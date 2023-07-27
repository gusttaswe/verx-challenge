import { Result } from 'shared/config/neverthrow.config'

// Domains
import { Producer } from 'domains/producer.domain'

export abstract class IProducerRepository {
  abstract save(producer: Producer): Promise<Result<null, Error>>
  abstract getByDocument(document: Producer['document']): Promise<Result<Producer, Error>>
}
