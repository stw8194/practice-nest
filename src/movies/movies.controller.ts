import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
//              ┎─ 라우터
@Controller('movies')
export class MoviesController {
  // NestJS에서는 쓰기 위해서는 요청해야 하기 때문에 service에 접근하기 위해서 constructor로 요청
  //                        ┏━ movieService라는 클래스, 이제 constructor는 movieSercie라는 클래스를 가짐
  constructor(private readonly moviesService: MoviesService) {}

  // @Get()
  // getAll() {
  //   return 'This will return all movies';
  // }

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  //     //  NestJs에서는 무언가 필요하면 요청해야함
  // @Get(':id')
  //     // ┎─ id라는 parameter를 요청해서 string 타입으로 movieId라는 argument에 저장
  //     // ┃  url 안에 있는 param과 요청한 param의 이름이 같아야함, argument의 이름은 달라도 됨
  // getOne(@Param('id') movieId: string) {
  //   return `This will return one movie with the id: ${movieId}`;
  // }

  @Get(':id')
  // //                            ┏━ url로 보낸 값은 뭐든지 일단 string임
  // getOne(@Param('id') movieId: string): Movie {
  //                              ┏━ entity에서 id는 number로 설정했기 때문에 ValidationPipe에 transform: true를 작성하여 number로 변환
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  //     //  이 부분이 위의 getOne보다 아래에 있으면 NestJS는 search를 parameter id로 판단해서
  //     //  We are searching for a movie with a title이 아니라 This will return one movie with the id: search를 리턴함
  // @Get('search')
  // search() {
  //   return 'We are searching for a movie with a title';
  // }

  // @Post()
  // create(@Body() movieData) {
  //   console.log(movieData);
  //   // return 'This will create a movie';
  //   return movieData;
  //   // express와 달리 설정을 하거나 json으로 return하지 않아도 json을 return 받을 수 있음
  // }

  @Post()
  //                            ┏━ dto를 사용하면 코드를 더 간결하게 작성할 수 있고 쿼리를 통한 유효성 걸사를 할 수 있음, 검사를 위해 main.ts에 pipe 작성
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  // @Delete(':id')
  // remove(@Param('id') movieId: string) {
  //   return `This will delete a movie with the id: ${movieId}`;
  // }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  //  ┎─ 일부 리소스를 업데이트, Put은 모든 리소스를 업데이트
  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    // return `This will patch a movie with the id: ${movieId}`;
    // return {
    //   updatedMovie: movieId,
    //   ...updateData,
    // };
    return this.moviesService.update(movieId, updateData);
  }
}
