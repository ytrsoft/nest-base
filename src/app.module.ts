import { Module } from '@nestjs/common'
import { VideoModule } from './video/video.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import sqlite from './sqlite'

@Module({
  imports: [
    TypeOrmModule.forRoot(sqlite),
    VideoModule
  ]
})
export class AppModule {}
