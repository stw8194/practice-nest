// 이게 app controller를 가질 때 하는 일
// 실제로 app controller를 작성할때는 따로 폴더에 넣지 말고 app.module.ts 옆에 뺴두기
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  home() {
    return 'Welcome to my Movie API';
  }
}
