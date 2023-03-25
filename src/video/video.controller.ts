
import { Request } from 'express'
import { Controller, Get, Req } from '@nestjs/common'
import { VideoPage, VideoPageDTO } from './video.types'
import { VideoService } from './video.service'
import { plainToInstance } from 'class-transformer'

@Controller('video')
export class VideoController {

  constructor(private readonly videoServ: VideoService) {}

  @Get('/page')
  async findAll(@Req() request: Request): Promise<VideoPage> {
    return this.videoServ.findAll(
      plainToInstance(
        VideoPageDTO, 
        request.query
      )
    )
  }
}
