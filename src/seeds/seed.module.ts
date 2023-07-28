import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Schemas
import { Culture } from 'domains/culture.entity'

// Seeders
import { CultureSeeder } from './culture.seed'

@Module({
  imports: [TypeOrmModule.forFeature([Culture])],
  providers: [CultureSeeder]
})
export class SeederModule {}
