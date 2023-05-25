import { Module } from '@nestjs/common';
// import { MoviesController } from './movies/movies.controller';
// import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app/app.controller';

@Module({
  // imports: [],
  // // ┎─url을 가져오고 함수를 실행, express의 라우터 같은 존재
  // controllers: [AppController],
  // providers: [AppService],
  imports: [MoviesModule],
  // // ┎─ app module은 사실 AppController, AppProvider만 가지고 있어야함
  // // ┃  때문에 MovieController, MovieService를 movies.module로 옮겨야함
  // controllers: [MoviesController],
  // providers: [MoviesService],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
