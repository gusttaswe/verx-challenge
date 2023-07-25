import { UUID, randomUUID } from 'crypto'

export abstract class Entity<T> {
  protected readonly _id: UUID

  constructor(props: T, id?: UUID) {
    this._id = id ?? randomUUID()
    Object.assign(this, props)
  }

  get id() {
    return this._id
  }
}
