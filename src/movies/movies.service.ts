import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  // 함수 이름은 controller와 같을 필요는 없지만 같아도 상관 없음
  getAll(): Movie[] {
    // 지금 만드는건 가짜 DB이고 진짜 DB는 DB에 대한 Query가 옴
    return this.movies;
  }
  //                    ┏━ 하나만 가져오는거라 리스트 형태 아님
  getOne(id: number): Movie {
    // //                                                      ┏━ entity에서 id를 number로 했기 때문에 string을 number로 변경 parseInt(id) 대신 +id로 해도 string을 number로 바꿀 수 있음
    // const movie = this.movies.find((movie) => movie.id === +id);
    //                                                      ┏━ 유혀성 검사 파이프에서 transform을 true로 해서 id를 number로 받기 때문에 더이상 변환이 필요 없어짐
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      //              ┏━ NestJS가 제공하는 예외처리
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: number) {
    //    ┏━ 예외 처리 굳이 다시 할 필요 없이 getOne 호출해주면 없는 id 입력했을때 예외처리 됨
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  // 가짜 서버이기 때문에 서버가 켜진 동안만 메모리에 데이터가 저장되고 끄면 사라짐
  // 생성 시 문제가 없었다면 201 status가 자동으로 나옴
  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  //                        ┏━ 그냥 updateData로 넣으면 유효성 검사가 안 된 상태라 아무 데이터나 넣을 수 있기 때문에 DTO(Data Transfer Object/데이터 전송 객체)를 만들어서 타입을 부여해 주어야 함
  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    //      ┏━ 아래 방법은 좋지 않지만 가짜 DB를 사용하고 있기 때문에 어쩔 수 없음
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
