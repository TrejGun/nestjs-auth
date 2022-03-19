# Session based REST authorization for Nest.js

This is the basic, old-fashioned, authorization which uses cookies and is most suitable for browsers.

To store session's data on the server side it additionally uses Redis.

## Optional

This example shows how to setup Nest.js authorization various 3rd party providers

 - local
 - google
 - facebood
 - onelogin

you have to have them configured in advance
only local provider works out of the box


## Manual installation

I assume you have nodejs, yarn/npm, postgres and redis

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

```shell script
curl \
-X POST http://localhost:3000/auth/login \
-d '{"email": "trejgun@gmail.com", "password": "My5up3r5tr0ngP@55w0rd"}' \
-H "Content-Type: application/json"
```

Also, you can log in with provider of your choice on
http://localhost:3000/auth/login

```bash
curl \
http://localhost:3000/users/profile \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWF0IjoxNTczOTk4ODM1LCJleHAiOjE1NzM5OTkxMzV9.b5GuR4X0BqD5CTj-KjVpXTl2D75CtTEfDxdR_ztBfpU"
```

This will return your profile
```json
{"id":1,"email":"trejgun@gmail.com","roles":["ADMIN"]}
```

This will return a list of users
```json
{"list":[{"id":1,"email":"trejgun@gmail.com","roles":["ADMIN"]}],"count":1}
```
