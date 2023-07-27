import { ApiProperty } from '@nestjs/swagger'
import { Err, Ok, Result } from 'neverthrow'
import { cpf, cnpj } from 'cpf-cnpj-validator'

export class Document {
  @ApiProperty({
    description: 'Defines a document. Can be a CNPJ or CPF',
    example: ''
  })
  value: string

  constructor(document: string) {
    this.value = document
  }

  static create(document: string): Result<Document, Error> {
    const isDocumentValid =
      document.length < 14 ? cpf.isValid(document) : cnpj.isValid(document)

    return isDocumentValid
      ? new Ok(new Document(document))
      : new Err(Error('Document is not valid!'))
  }
}
