import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //                          ┏━ 유효성 검사를 위한 파이프, 파이프는 코드가 지나가는 곳 미들웨어 같은 것, 사용 전에 npm i class-validator, class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      //  ┏━ true로 설정하면 아무 decorator도 없는 어떠한 property의 object를 거릅니다, 즉 입력 시 dto에 없는 property는 validator에 도달하지 않음 -> 누군가 이상한 걸 보내면 요청 자체를 막을 수 있음
      //  ┃  false로 설정하면 dto에 없는 property가 있더라도 dto에 있는 property만 유효성 검사에 통과하면 전체 저장
      //  ┃  테스트 해보니 dto에 있더라도 decorator가 없으면 유효성 validator에 도달하지 않음
      //  ┃  ex) whitelist:true인 경우  - title, year, genres, test를 입력하면 title, year, genres만 저장
      //  ┃      whitelist:false인 경우 - title, year, genres, test를 입력하면 title, year, genres, test가 저장
      whitelist: true,
      //  ┏━ 이걸 작성하지 않으면 없는 요소를 입력했을 때 생성이 되지만 true로 작성하면 존재해선 안 되는 요소라고 생성도 막고 400 status를 보냄
      //  ┃  whitelist 없이 이것만 작성하니까 존재해선 안 되는 요소 있어도 생성 됨. 두개 같이 써야함
      forbidNonWhitelisted: true,
      //  ┏━ 유저들이 입력한 것을 원하는 실제 타입(contoller에 작성한 타입)으로 변환해줌
      //  ┃  false로 하면 controller에서 id: number로 한다고 해도 string으로 가져옴
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
