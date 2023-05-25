import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

// ┎─ 테스트를 묘사
describe('MoviesService', () => {
  let service: MoviesService;

  // ┎─ 각각의 테스트를 하기 전에 실행되는 것
  // ┃  beforeAll, afterEach, afterAll도 있음
  // ┃  예를 들어 afterAll에는 DB를 지우는 함수를 넣을 수도 있음
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // // test:watch로 실행했다면 테스트가 추가될 때마다 테스트가 실행됨
  // // 이름은 상관 없고 뒤에 테스트하고 싶은 부분을 함수로 만들어야함
  // it('should be 4', () => {
  //   // 테스트에는 조건이 필요
  //   // ┎─ 2+2가 4와 같기를 기대
  //   // expect(2 + 2).toEqual(4);
  //   // ┎─ fail인 경우 기대값과 받은 값이 출력
  //   expect(2 + 2).toEqual(5);
  // });

  // ┎─ 같은 이름일 필요는 없음, 이게 유닛 테스트임
  describe('getAll', () => {
    it('should return an array', () => {
      //                 ┎─ beforEach에서 service를 가져옴
      const result = service.getAll();

      //                    ┎─ getAll로 가져온 값이 배열이기를 기대
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      // 개수로 비교할 수도 있고 마지막에 오는 영화 이름으로 할 수도 있고 마음대로 만들 수 있음
      const beforeCreate = service.getAll().length;

      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate); // 0 1

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      // //        ┎─ getOne을 테스트할 때 movie가 없다면 문제가 될 수 있기 때문에 우선 생성
      // service.create({
      //   title: 'Test Movie',
      //   genres: ['test'],
      //   year: 2000,
      // });

      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw a NotFoundException', () => {
      try {
        //              ┎─ id 999는 없기 때문에 NotFoundException이 나옴
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      // service.create({
      //   title: 'Test Movie',
      //   genres: ['test'],
      //   year: 2000,
      // });
      // console.log(service.getAll());
      // // ┗━ [ { id: 1, title: 'Test Movie', genres: [ 'test' ], year: 2000 } ]
      const allMovies = service.getAll().length; // 1
      service.deleteOne(1);
      const afterDelete = service.getAll().length; // 0

      expect(afterDelete).toBeLessThan(allMovies);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      // // 이렇게 복사 붙여넣기 하는 것 대신 beforEach 안에서 만들어도 됨
      // service.create({
      //   title: 'Test Movie',
      //   genres: ['test'],
      //   year: 2000,
      // });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);

      expect(movie.title).toEqual('Updated Test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  // 이렇게 모든 함수를 작성하고 나면 test:cov에서 movies.service가 100%가 됨
});
