import { Repository } from 'typeorm'
import { Injectable, OnApplicationBootstrap } from '@nestjs/common'

// Entity
import { Culture, cultureTypes } from 'domains/culture.entity'

// Shared
import { Result } from 'shared/config/neverthrow.config'
import { InjectRepository } from '@nestjs/typeorm'

const culturesData: Omit<Culture, 'id'>[] = [
  { name: cultureTypes.SOJA },
  { name: cultureTypes.MILHO },
  { name: cultureTypes.ALGODAO },
  { name: cultureTypes.CAFE },
  { name: cultureTypes.CANA_DE_ACUCAR }
]

@Injectable()
export class CultureSeeder implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Culture)
    private readonly cultureRepository: Repository<Culture>
  ) {}

  async onApplicationBootstrap() {
    for (const cultureData of culturesData) {
      const culture = Culture.create(cultureData)._unsafeUnwrap()
      const cultureExists = await this.cultureRepository.exist({ where: culture })
      if (!cultureExists) {
        await this.cultureRepository.save(culture)
      }
    }
  }
}
