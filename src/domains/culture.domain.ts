import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import { Entity } from 'shared/core/entity'

interface CultureProps {
  id?: UUID
  city: string
  state: string
}

export enum cultureTypes {
  SOJA = 'soja',
  MILHO = 'milho',
  ALGODAO = 'algodão',
  CAFE = 'café',
  CANA_DE_ACUCAR = 'cana de açucar'
}

export class Culture extends Entity<CultureProps> {
  @ApiProperty({
    description: 'A Type of culture planted on the farm',
    example: cultureTypes
  })
  name: string

  constructor({ id, ...props }: CultureProps) {
    super(props, id)
  }
}
