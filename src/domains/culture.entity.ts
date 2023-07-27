import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import { Entity } from 'shared/core/entity'

interface CultureProps {
  name: string
}

export enum cultureTypes {
  SOJA = 'soja',
  MILHO = 'milho',
  ALGODAO = 'algodão',
  CAFE = 'café',
  CANA_DE_ACUCAR = 'cana de açucar'
}

export class Culture extends Entity<CultureProps> {
  constructor(props: CultureProps, id?: UUID) {
    super(props, id)
  }

  @ApiProperty({
    description: 'A Type of culture planted on the farm',
    example: cultureTypes
  })
  get name(): string {
    return this.props.name
  }
}
