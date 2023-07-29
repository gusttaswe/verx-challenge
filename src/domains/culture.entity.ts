import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

// shared
import { CoreEntity } from 'shared/core/entity'
import { Result, Ok } from 'shared/config/neverthrow.config'
import { UUID } from 'crypto'

interface CultureProps {
  id?: UUID
  name: string
}

export enum cultureTypes {
  SOJA = 'Soja',
  MILHO = 'Milho',
  ALGODAO = 'Algodão',
  CAFE = 'Café',
  CANA_DE_ACUCAR = 'Cana de açucar'
}

@Entity()
export class Culture extends CoreEntity {
  constructor() {
    super()
  }

  static create(props: CultureProps): Result<Culture, Error> {
    const culture = new Culture()
    Object.assign(culture, props)
    return new Ok(culture)
  }

  @ApiProperty({
    description: 'A Type of culture planted on the farm',
    example: cultureTypes.ALGODAO
  })
  @Column()
  name: string
}
