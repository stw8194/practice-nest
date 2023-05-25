NestJS

> NestJS는 Express 위에서 돌아가기 때문에 Request, Response 객체가 필요하면 요청하고 사용하면 됨<br>
> 하지만 NestJS는 두 개의 프레임워크와 작동하기 때문에 req, res를 사용하는 건 좋은 방법은 아님<br>
> 기본적으로는 express 위에서 실행되지만 Fastify(express보다 2배 빠름)로 전환시킬 수도 있음<br>
> res, req를 써도 되지만 프레임워크를 바꾸고 싶으면 문제가 됨, NestJS 방식만 쓰는것이 좋음

controller

> url을 가져와서 함수를 실행 - 모든 url이 놓이는 곳

service

> controller에서 실행된 함수가 있는 곳 - 비즈니스 로직을 실행하는 역할 - 데이터베이스에 연락

generate

> nest 커맨드의 하나로 nest 요소를 생성함(ex. 컨트롤러, 서비스, 가드 ...)

dependency injection

> 예를 들어 movies.controller.ts에서 getAll에는
> this.moviesService.getAll()을 사용하고 있음
> 이게 작동하는 이유는 constructor에서 moviesService라는 property를 만들고 타입을 지정해주었기 때문임<br>
> MoviesModule을 보면 controller, provider를 import하고 있는데 여기서 providers에 service를 작성하면 NestJS가 service를 import하고 Controller에 inject하게 됨<br>
> MovieService를 보면 Injectable이라는 decorator가 있음<br>
> 이렇게 클래스 간의 의존관계를 빈 설정 (Bean Definition) 정보를 바탕으로 컨테이너가 자동으로 연결해주는 것을 DI라고 한다고 JAVA에서 말하는데 module 설정대로 NestJS가 자동으로 연결해주는 거라고 생각하면 될 듯

# Testing in Nest

> - package.json을 보면 test와 관련된 스크립트가 5개 있음
> - jest는 자바스크립트를 쉽게 테스팅하는 npm 패키지, NestJS에서 미리 세팅되어 있음<br>
> - ~.spec.ts 파일이 테스팅하는 파일인게 기본 규칙
> - NestJS에서는 jest가 ~.spec.ts 파일들을 찾을 수 있도록 설정되어 있음
>
> |            |       커맨드       |                                                       |                                                                 |                                                   |                    |
> | :--------: | :----------------: | :---------------------------------------------------: | :-------------------------------------------------------------: | :-----------------------------------------------: | :----------------: |
> |    test    |    npm run test    |
> | test:watch | npm run test:watch |    spec 파일들을 찾아서 무슨 일이 일어나는지 관찰     |
> |  test:cov  |  npm run test:cov  | 코드가 얼마나 테스팅 되었는지 또는 안 되었는지 알려줌 |   모든 spec.ts 파일들을 찾아서 몇 줄이 테스트 되었는지 알려줌   |
> | test:debug | npm run test:debug |
> |  test:e2e  |  npm run test:e2e  | 어떤 페이지로 가면 특정 페이지가 나와야하는 경우 사용 | 사용자 관점에서 특정 링크를 클릭하면 볼 수 있어야 하는걸 테스트 | 사용자가 취할많나 액션들을 처음부터 끝까지 테스트 | test 폴더가 필요함 |

### 테스팅의 종류

> |          종류          |                                 |                                            |                                                               |                                                                      |                          |
> | :--------------------: | :-----------------------------: | :----------------------------------------: | :-----------------------------------------------------------: | :------------------------------------------------------------------: | :----------------------: | --------------------------------------------------- | ------------------------------------------------------------- |
> |       유닛테스팅       | 서비스에서 분리된 유닛을 테스트 |          모든 함수를 따로 테스트           | ~.spec.ts가 붙은 파일들은 해당 파일의 유닛 테스트를 위한 것임 |
> | end-to-end(e2e) 테스트 |      모든 시스템을 테스트       | package.jsom에서 e2e테스트 스크립트가 있음 |         e2e 테스트를 하기 위해서는 test 폴더가 필요함         | 비밀번호 암호화나 저장처럼 유닛테스트 함수를 만들기 복잡한 경우 사용 | url에 대한 요청을 테스트 | Controller, Service, Pipe의 결과에 대해 모든 테스트 | 기본적으로 request 보내는 걸 테스트하고 그 결과를 받기를 원함 |