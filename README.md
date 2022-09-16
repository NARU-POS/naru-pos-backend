# Naru-POS-BackEnd

## 주요 개발 스택

```
Node.js
Express
TypeScript

MongoDB(mongodb Cloud)
Mongoose

Joi

Jest
Prettier
Eslint
```

## 실행방법

- 서비스 테스트를 수행하려면 MongoDB가 설치되어 있어야 합니다.

### `Local 환경에서 실행하기`

```bash
yarn # install packages

yarn dev # start server in dev environment

yarn test # start test with jest
```

## 환경설정 정보

```
MONGODB_URL                 # 데이터베이스 URL
PORT                        # 서버 실행 포트
JWT_SECRET_KEY              # JWT PRIVATE KEY
JWT_PUBLIC_KEY              # JWT PUBLIC KEY
CLOUDINARY_NAME             # Storage 이름
CLOUDINARY_API_KEY          # Storage API KEY
CLOUDINARY_SECRET_KEY       # Stoaged SECRET KEY
```

## 주요 기능 개발

[`기능 구현 목록 - ChangeLog`](https://github.com/NARU-POS/naru-pos-backend/wiki/ChangeLog)
