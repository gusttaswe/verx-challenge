import { Result } from '../config/neverthrow.config'

export abstract class UseCase<T, R, E> {
  public abstract execute(input: T): Promise<Result<R, E>>
}
