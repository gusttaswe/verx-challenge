export interface Mapper<T> {
  toDomain(raw: any): T
}
