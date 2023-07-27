import { Result } from 'shared/config/neverthrow.config'

// Domains
import { Producer } from 'domains/producer.entity'
import { Document } from 'domains/document.domain'

export abstract class IProducerRepository {
  abstract save(producer: Producer): Promise<Result<null, Error>>
  abstract getByDocument(document: Document): Promise<Result<Producer, Error>>
}
