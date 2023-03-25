import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Video } from '../entities/video'
import { Repository } from 'typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

@Injectable()
export class VideoService extends TypeOrmCrudService<Video>  {

  constructor(@InjectRepository(Video) videoRepository: Repository<Video>) { 
    super(videoRepository)
  }

}
