// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     //              ┎─ NestJS는 컨트롤러와 비즈니스 로직을 구분짓고 싶어함. 컨트롤러는 그냥 url을 가져오고 함수를 실행하는 역할, 나머지 비즈니스 로직은 서비스가 가져가고 서비스가 실제 함수를 가지는 부분
//     return this.appService.getHello();
//   }

//   // ┎─ /hello로 누군가 들어오면 sayHello라는 함수를 실행
//   @Get('/hello')
//   sayHello(): string {
//     // ┎─ 컨트롤러와 서비스를 구분해야하기 때문에 아래 보다는
//     // return 'Hello everyone';
//     // ┎─ 이런 식으로 작성해야함
//     return this.appService.getHi();
//   }
// }
