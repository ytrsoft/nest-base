import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Video } from 'src/entities/video'

const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'src/sqlite/storage.sqlite',
  entities: [Video],
  synchronize: true
}

export default config
