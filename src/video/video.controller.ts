import { Controller } from '@nestjs/common'
import { VideoService } from './video.service'
import { Crud, CrudController } from '@nestjsx/crud'
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
}
