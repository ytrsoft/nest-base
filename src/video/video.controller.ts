import { Controller, Get, Query } from '@nestjs/common'
import { VideoService } from './video.service'
import { Crud, CrudController, GetManyDefaultResponse } from '@nestjsx/crud'
import { Video } from 'src/entities/video'

@Crud({
  model: {
    type: Video
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true
    }
  },
  query: {
    limit: 10
  }
})
@Controller('video')
export class VideoController implements CrudController<Video> {

  constructor(public service: VideoService) {}

  @Get('queryTags')
  async queryTags(): Promise<Tag[]> {
    return this.service.queryTags()
  }

  @Get('queryRandoms')
  async queryRandoms(@Query('limit') limit: number): Promise<Video[]> {
    return this.service.queryRandoms(limit)
  }

  @Get('queryPage')
  async queryPage(@Query('page') page: number, @Query('limit') limit: number, @Query('tag') tag: string, @Query('title') title: string): Promise<GetManyDefaultResponse<Video>> {
    return this.service.queryPage(page, limit, tag, title);
  }

}
