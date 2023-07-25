import { ApiProperty } from '@nestjs/swagger'

export class Post {
  @ApiProperty()
  title: string

  @ApiProperty()
  slug: string

  @ApiProperty()
  description: string

  @ApiProperty()
  content: string

  @ApiProperty()
  category: string[]

  @ApiProperty()
  readMinutes: string

  @ApiProperty()
  desktopImage: string

  @ApiProperty()
  mobileImage: string

  @ApiProperty()
  isHighlight?: boolean

  @ApiProperty()
  technologies: string[]

  @ApiProperty()
  hashtags: string[]

  @ApiProperty()
  createdAt: string

  @ApiProperty()
  updatedAt: string

  constructor(post: Post) {
    Object.assign(this, post)
  }
}
