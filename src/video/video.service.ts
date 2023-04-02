import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Video } from '../entities/video'
import { Repository } from 'typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { GetManyDefaultResponse } from '@nestjsx/crud'

@Injectable()
export class VideoService extends TypeOrmCrudService<Video>  {

  constructor(@InjectRepository(Video) public videoRepository: Repository<Video>) { 
    super(videoRepository)
  }

  async queryPage(page: number = 1, limit: number = 12, tag: string = '', title: string = ''): Promise<GetManyDefaultResponse<Video>> {
    const [data, total] = await Promise.all([
      this.videoRepository.createQueryBuilder('video')
        .where(tag ? 'video.tag = :tag' : '', { tag })
        .andWhere(title ? 'video.title LIKE :title' : '', { title: `%${title}%` })
        .take(limit)
        .skip((page - 1) * limit)
        .getMany(),
      this.videoRepository.createQueryBuilder('video')
        .where(tag ? 'video.tag = :tag' : '', { tag })
        .andWhere(title ? 'video.title LIKE :title' : '', { title: `%${title}%` })
        .getCount(),
    ]);
    const pageCount = Math.ceil(total / limit)

    return {
      data,
      count: data.length,
      total,
      page,
      pageCount,
    }
  }
  
  async queryTags(): Promise<Tag[]> {
    return this.videoRepository.createQueryBuilder()
    .select('tag', 'label')
    .addSelect('COUNT(tag)', 'value')
    .groupBy('label')
    .orderBy('value', 'DESC')
    .getRawMany()
  }

  async queryRandoms(limit: number = 4): Promise<Video[]> {
    const randomVideos = await this.videoRepository
      .createQueryBuilder()
      .orderBy('RANDOM()')
      .limit(limit)
      .getMany()
    return randomVideos
  }

}
