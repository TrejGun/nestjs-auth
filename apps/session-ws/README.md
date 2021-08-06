# Session based WebSockets authorization for Nest.js

This is the basic, old-fashioned, authorization which uses cookies and is most suitable for browsers.

To store session's data on the server side it additionally uses Redis.

## Manual installation

I assume you have node, yarn/npm, postgres and redis

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

```shell script
curl -v \
-X POST http://localhost:3000/auth/login \
-d '{"email": "trejgun@gmail.com", "password": "My5up3r5tr0ngP@55w0rd"}' \
-H "Content-Type: application/json"
```

Also, you can log in with provider of your choice on
http://localhost:3000/auth/login

This will return your profile
```json
{"id":1,"email":"trejgun@gmail.com","roles":["ADMIN"]}
```

This will return a list of users
```json
{"list":[{"id":1,"email":"trejgun@gmail.com","roles":["ADMIN"]}],"count":1}
```
