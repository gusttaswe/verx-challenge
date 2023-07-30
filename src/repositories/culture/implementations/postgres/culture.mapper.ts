import { Culture } from 'domains/culture.entity'
import { Mapper } from 'shared/core/mapper'

export class CultureMapper implements Mapper<Culture> {
  public toDomain(raw: any): Culture {
    const cultureOrError = Culture.create({
      id: raw.id,
      name: raw.name
    })

    return cultureOrError.isOk() ? cultureOrError.value : null
  }
}
