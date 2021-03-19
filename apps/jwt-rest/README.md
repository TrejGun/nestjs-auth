# JWT based authorization for Nest.js

This is a code sample for my [article](https://trejgun.github.io/articles/jwt-based-authorization-for-nestjs)

## Installation

I assume you have node, yarn/npm and postgres

First of all you have to download dependencies
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

Otherwise you can use docker 

```shell script
docker-compose up --build
```

## Usage 

You can log in to the application using **trejgun@gmail.com/My5up3r5tr0ngP@55w0rd** by executing this CURL request

```bash
curl \
-X POST http://localhost:3000/auth/login \
-d '{"email": "trejgun@gmail.com", "password": "My5up3r5tr0ngP@55w0rd"}' \
-H "Content-Type: application/json"
```

This will give you accessToken
```json
{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRyZWpndW5AZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE1NjU4NTgwMDUsImV4cCI6MTU2NTg1ODA2NX0.jqfDhj-sSHtOiT41eD0vBuj64lgBg87oGIyJ78c5gus"}
```

which is valid for 5 minutes, after this time you have to refresh it using
```sh
curl \
-X POST http://127.0.0.1:3000/auth/refresh \
-d '{"refreshToken": "2b1764be-a13f-4630-9696-09f9e0f2bbd7"}' \
-H "Content-Type: application/json"
```

```json
{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWF0IjoxNTcyOTU3NjA0LCJleHAiOjE1NzMyNTc2MDR9.WSXXz20wbsOajwefbDQ7wb2tgdRLRby02AzhzfyDvjw","refreshToken":"72633d7f-2327-4508-940d-86780b3ba7b7","accessTokenExpiresAt":1572957798255,"refreshTokenExpiresAt":1575549498255}
```

refreshToken is valid for 30 days, but can be destroyed manually

```sh
 curl \
 -X POST http://127.0.0.1:3000/auth/logout \
 -d '{"refreshToken: "2b1764be-a13f-4630-9696-09f9e0f2bbd7"}' \
 -H "Content-Type: application/json"
 ```


Put this accessToken in header of each of your subsequent requests

```bash
curl \
http://localhost:3000/users/profile \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWF0IjoxNTczOTk4ODM1LCJleHAiOjE1NzM5OTkxMzV9.b5GuR4X0BqD5CTj-KjVpXTl2D75CtTEfDxdR_ztBfpU"

```

This will return your profile
```json
{"id":1,"email":"trejgun@gmail.com","roles":["admin"]}
```

```bash
curl \
http://localhost:3000/users/list \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU3Mjc4MjA1MiwiZXhwIjoxNTcyNzgyMTEyfQ.JwBpPo8eK4WAY2hs4orkbQ7j-QShGToMixUiadGJZf4"

```

This will return a list of users
```json
{"list":[{"id":1,"email":"trejgun@gmail.com","roles":["admin"]}],"count":1}
```
