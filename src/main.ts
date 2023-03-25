import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './filters/global-exception-filter'
import { GlobalResponseInterceptor } from './interceptors/global-response-interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalInterceptors(new GlobalResponseInterceptor())
  await app.listen(8080)
}

bootstrap()
