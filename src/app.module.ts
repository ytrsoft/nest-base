import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { VideoModule } from './video/video.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthMiddleware } from './middlewares/auth-middleware'
import sqlite from './sqlite'

@Module({
  imports: [
    TypeOrmModule.forRoot(sqlite),
    VideoModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
