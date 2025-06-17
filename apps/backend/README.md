# apps/backend

### 간단 소개

- TypeORM을 사용해서 DB에 접근합니다. DB는 Postgresql을 사용합니다.
- Passport를 사용해서 사용자 인증 기능을 구현합니다. 템플릿인 만큼 아주 기초적인 ID/PW 방식 인증만 구현 되어 있습니다.
- 개발용 데이터베이스는 docker를 사용합니다.

### 프로젝트 설정

- example-env파일을 복제한 다음, 이름을 .env로 수정합니다.
- 개발용 데이터베이스를 실행합니다
    ```
    docker compose up -d
    ```
- Prisma Schema와 개발용 데이터베이스를 동기화합니다.
    ```
    pnpm sync
    ```
- 개발용 데이터베이스에 초기 데이터를 채워 넣습니다.
    ```
    pnpm seed
    ```