// import { IsString, IsNumber } from 'class-validator';

// ┏━ 이렇게 create와 같은 걸 한번 더 쓰는 대신 PartialType을 쓰면 간단함
// ┃  npm i @nestjs/mapped-types 후 사용
// export class UpdateMovieDto {
//   @IsString()
//   //            ┏━ 필수는 아니라는 의미
//   readonly title?: string;

//   @IsNumber()
//   readonly year?: number;

//   //            ┏━ string의 리스트니까 각각의 요소에 대해서 검사
//   @IsString({ each: true })
//   readonly genres?: string[];
// }

// 위의 코드를 아래와 같이 작성할 수 있음
// 전부 필수 사항이 아니라는 것만 제외하면 CreateMovieDto와 동일함

import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
