import { Result } from 'shared/config/neverthrow.config'

// Domains
import { Producer } from 'domains/producer.entity'
import { Document } from 'domains/document.domain'

export abstract class IProducerRepository {
  abstract save(producer: Producer): Promise<Result<Producer, Error>>
  abstract update(producer: Producer): Promise<Result<Producer, Error>>
  abstract exists(ref: Document | Producer['id']): Promise<boolean>
  abstract getById(id: Producer['id']): Promise<Result<Producer, Error>>
  abstract delete(id: Producer['id']): Promise<Result<null, Error>>
}
