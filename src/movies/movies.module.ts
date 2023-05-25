import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

// 앱을 만들 때 모듈로 분리해야 좋기 때문에 app.module이 movies를 import하고 controller와 provider는 movies에 둠
@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
