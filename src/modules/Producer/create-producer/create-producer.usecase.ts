import { Injectable } from '@nestjs/common'

// Interfaces & Types
import { UseCase } from 'shared/core/usecase'

@Injectable()
export class CreateProducerUseCase implements UseCase<any, any, any> {
  constructor() {}

  public async execute(): Promise<any> {}
}
