import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import Pkg from '../package.json'

// Shared
import { HttpExceptionFilter } from 'shared/filters/http-exception.filter'

// Module
import { AppModule } from './app.module'

const swaggerSetup = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(Pkg.name)
    .setDescription(Pkg.description)
    .setVersion(Pkg.version)
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  swaggerSetup(app)
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  await app.listen(3000, () => {
    console.log('🚀🚀🚀 Running on Port:', 3000)
  })
}
bootstrap()
