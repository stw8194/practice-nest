import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  MethodNotAllowedException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach로 하면 테스트할 때마다 어플리케이션을 새로 만들기 때문에 DB가 비게 됨
  // 때문에 beforeAll로 바꾸겠음
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // NestJS는 매 테스트마다 어플리케이션을 생성
    // 여기서 생성되는 모듈은 브라우저에서 테스트할 수 있는 진짜 어플리케이션과는 다름
    // 이 부분에서 문제가 생기는데
    // 예를 들어 현재 movies에서 id는 url로 받기 때문에 string 타입인 것을 main.ts에서 파이프의 transform을 통해 number로 바꾸었음
    // 하지만 테스트에서 생성한 어플리케이션은 파이프 설정이 없기 때문에 별다른 설정 없이 id 부분을 테스트하면 string으로 받기 때문에
    // 오류가 발생함(transform은 main.ts에만 있고 spec.ts에는 없음)
    app = moduleFixture.createNestApplication();
    // 때문에 아래의 파이프를 추가해 주어야함
    // 테스팅 환경도 실제 구동 환경의 설정을 그대로 적용시켜줘야 함
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['test'] })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['test'], other: 'thing' })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  // it('/movies (GET)', () => {
  //   //                  ┎─ http://localhost:3000/ 같은걸 안 쓰기 위해서
  //   return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
  // });

  describe('/movies/:id', () => {
    // // it.todo를 작성하면 e2e test를 했을때 연필모양 아이콘이 생김
    // // test를 작성해야한다는 todo 리스트의 역할
    // it.todo('GET');
    // it.todo('DELETE');
    // it.todo('PATCH');

    it('GET 200', () => {
      // beforeEach를 beforeAll로 바꾸었기 때문에 POST에서 생성한 id 1인 데이터가 그대로 있음
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      // beforeEach를 beforeAll로 바꾸었기 때문에 POST에서 생성한 id 1인 데이터가 그대로 있음
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
