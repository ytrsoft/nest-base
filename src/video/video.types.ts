import { Transform } from 'class-transformer'
import { Video } from 'src/entities/video'

export interface VideoPage {
  list: Video[]
  total: number
  pages: number
}

export class VideoPageDTO {
  @Transform(({ value }) => parseInt(value))
  no: number = 1
  @Transform(({ value }) => parseInt(value))
  size: number = 10
  title: string
}