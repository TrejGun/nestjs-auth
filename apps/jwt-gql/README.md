# GraphQL + JWT based authorization for Nest.js

JWT stands for JSON Web Token. This type of authorization does not store user's data on server but passes it with each request

It is same good for casual websites, server to server communications and mobile apps

## Manual installation

I assume you have nodejs, yarn/npm and postgres

First you have to download dependencies

```bash
npm i
```

Then check config in
```bash
nano .env
```

and start in watch mode
```bash
npm run start
```

or in production mode
```bash
npm run build
npm run prod
```

## Docker

Otherwise, you can use docker

```shell script
docker-compose up --build
```

## Usage

You can log in to the application using **trejgun@gmail.com/My5up3r5tr0ngP@55w0rd** by executing this CURL request

```bash
curl \
-X POST http://127.0.0.1:3000/graphql \
-d '{"query":"mutation{\n  login(email: \"trejgun@gmail.com\", password: \"My5up3r5tr0ngP@55w0rd\") {\n    accessToken\n    refreshToken\n    accessTokenExpiresAt\n    refreshTokenExpiresAt\n  }\n}\n"}' \
-H "Content-Type: application/json"
```

This will give you accessToken
```json
{"data":{"login":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWF0IjoxNTcyOTU3NzMwLCJleHAiOjE1NzMyNTc3MzB9.U3Fx9eYu-qSmPLjB0-2tbs8xouXGncwey4g9FYj5GHY","refreshToken":"5170b4a5-1cea-4d4e-868a-b42dd2aec1e2","accessTokenExpiresAt":1572957798255,"refreshTokenExpiresAt":1575549498255}}}
```

which is valid for 5 minutes, after this time you have to refresh it using
```sh
curl \
-X POST http://127.0.0.1:3000/graphql \
-d '{"query":"mutation{\n  refreshToken(refreshToken: \"2b1764be-a13f-4630-9696-09f9e0f2bbd7\") {\n    accessToken\n    refreshToken\n    accessTokenExpiresAt\n    refreshTokenExpiresAt\n  }\n}"}' \
-H "Content-Type: application/json"
```

```json
{"data":{"refreshToken":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWF0IjoxNTcyOTU3NjA0LCJleHAiOjE1NzMyNTc2MDR9.WSXXz20wbsOajwefbDQ7wb2tgdRLRby02AzhzfyDvjw","refreshToken":"72633d7f-2327-4508-940d-86780b3ba7b7","accessTokenExpiresAt":1572957798255,"refreshTokenExpiresAt":1575549498255}}}
```

refreshToken is valid for 30 days, but can be destroyed manually

```sh
 curl \
 -X POST http://127.0.0.1:3000/graphql \
 -d '{"query":"mutation{\n  logout(refreshToken: \"2b1764be-a13f-4630-9696-09f9e0f2bbd7\")\n}"}' \
 -H "Content-Type: application/json"
 ```

```json
{"data":{"logout":true}}
```

Put this accessToken in header of each of your subsequent requests

```bash
curl \
-X POST http://127.0.0.1:3000/graphql \
-d '{"query":"query {\n  profile {\n    id\n    email\n    roles\n  }\n}"}' \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWF0IjoxNjE4OTc0MTIzLCJleHAiOjE2MTg5NzQ0MjN9.MPTGJ3mjJ5HjFsC1XLBCT1oGdLSG3VSPAaArO_E3Ong" \
-H "Content-Type: application/json"
```

This will return your profile
```json
{"data":{"profile":{"id":1,"email":"trejgun@gmail.com","roles":["ADMIN"]}}}
```

```bash
curl \
-X POST http://127.0.0.1:3000/graphql \
-d '{"query":"query{\n  listUsers {\n  \trows {\n      id\n      email\n      roles\n    }\n    count\n  }\n}"}' \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWF0IjoxNTcyOTU2MDUzLCJleHAiOjE1NzMyNTYwNTN9.-RrT9N1CclFelsWnwAAgsTBGTJLmRRuhcYhjTWu4jA0" \
-H "Content-Type: application/json"
```

This will return a list of users
```json
{"data":{"listUsers":{"rows":[{"id":1,"email":"trejgun@gmail.com","roles":["ADMIN"]}],"count":1}}}
```
