import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Video } from '../entities/video'
import { Repository } from 'typeorm'
import { VideoPage, VideoPageDTO } from './video.types'

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoResp: Repository<Video>
  ) { }

  async findAll(videoPage: VideoPageDTO): Promise<VideoPage> {
    const queryBuilder = this.videoResp.createQueryBuilder()
    if (videoPage.title) {
      queryBuilder.where(
        'LOWER(video.title) LIKE LOWER(:title)', 
        { title: `%${videoPage.title}%` }
      )
    }
    const skip = (videoPage.no - 1) * videoPage.size
    queryBuilder.offset(skip).limit(videoPage.size)
    const [list, total] = await queryBuilder.getManyAndCount()
    const pages = Math.ceil(total / videoPage.size);
    return { list, total, pages }
  }
}
