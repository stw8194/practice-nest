//                                                      ┏━ 거의 모든 유효성 검사를 할 수 있음
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  //            ┏━ string의 리스트니까 각각의 요소에 대해서 검사
  @IsString({ each: true })
  readonly genres: string[];
}
