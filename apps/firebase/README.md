# JWT based authorization for Nest.js

JWT stands for JSON Web Token. This type of authorization does not store user's data on server but passes it with each request

It is same good for casual websites, server to server communications and mobile apps

## Installation

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
{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWF0IjoxNjQzNzgyODUxLCJleHAiOjE2NDM3ODMxNTF9.7s3yqyp1rxP6k9iICwYG-S3c9fMu5eF_Eh4SXUOfSyI","refreshToken":"e199c71d-df0b-4c3e-b667-b29a36b8570b","accessTokenExpiresAt":1643783151584,"refreshTokenExpiresAt":1646374851584}
```

which is valid for 5 minutes, after this time you have to refresh it using
```sh
curl \
-X POST http://127.0.0.1:3000/auth/refresh \
-d '{"refreshToken": "2b1764be-a13f-4630-9696-09f9e0f2bbd7"}' \
-H "Content-Type: application/json"
```

```json
{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWF0IjoxNjQzNzgyODUxLCJleHAiOjE2NDM3ODMxNTF9.7s3yqyp1rxP6k9iICwYG-S3c9fMu5eF_Eh4SXUOfSyI","refreshToken":"72633d7f-2327-4508-940d-86780b3ba7b7","accessTokenExpiresAt":1572957798255,"refreshTokenExpiresAt":1575549498255}
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
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWF0IjoxNjQzNzgyODUxLCJleHAiOjE2NDM3ODMxNTF9.7s3yqyp1rxP6k9iICwYG-S3c9fMu5eF_Eh4SXUOfSyI"
```

This will return your profile
```json
{"id":1,"email":"trejgun@gmail.com","roles":["ADMIN"]}
```

```bash
curl \
http://localhost:3000/users \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWF0IjoxNjQzNzgyODUxLCJleHAiOjE2NDM3ODMxNTF9.7s3yqyp1rxP6k9iICwYG-S3c9fMu5eF_Eh4SXUOfSyI"

```

This will return a list of users
```json
{"list":[{"id":1,"email":"trejgun@gmail.com","roles":["ADMIN"]}],"count":1}
```
