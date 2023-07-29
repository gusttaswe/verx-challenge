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
    const onlyNumbers = document.replace(/\D/gi, '')
    const isDocumentValid =
      onlyNumbers.length < 14 ? cpf.isValid(onlyNumbers) : cnpj.isValid(onlyNumbers)

    return isDocumentValid
      ? new Ok(new Document(document))
      : new Err(Error('Document is not valid!'))
  }
}
