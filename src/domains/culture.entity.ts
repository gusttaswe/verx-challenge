import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import { CoreEntity } from 'shared/core/entity'
import { Column, Entity } from 'typeorm'

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

@Entity()
export class Culture extends CoreEntity<CultureProps> {
  constructor(props: CultureProps, id?: UUID) {
    super(props, id)
  }

  @ApiProperty({
    description: 'A Type of culture planted on the farm',
    example: cultureTypes
  })
  @Column()
  name: string
}
