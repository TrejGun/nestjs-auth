<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Authorization examples

## Overview

Please see readme.md in each app for more information

### Session REST

This is the basic, old-fashioned, authorization which uses cookies and is most suitable for browsers.

To store session's data on the server side it additionally uses Redis.

### Session WS

Same as above but with WebSockets support

### JWT REST

JWT stands for JSON Web Token. This type of authorization does not store user's data on server but passes it with each request

It is same good for casual websites, server to server communications and mobile apps

### JWT WS

Same as above but with WebSockets support

### JWT GQL

GraphQL based version of JWT authorization

### JWKS REST

JWKS stands for JSON Web Key Sets. This is a set of keys containing the public keys used to verify any JWT issued by the authorization server

This type of authorization feats the best if you are going to have only one Authorization provider (like Auth0) with multiple accounts

## Installation

It is assumed that you have nodejs, yarn/npm, postgres and for session based apps - redis already installed on your system

Then if you are going to use features provided by monorepo you can install all dependencies at once

```bash
npm i
npm run bootstrap
```

then go to any app and execute
```bash
npm start
```

this will start application on default settings.

Otherwise, go to each individual app and check readme.md

## Strategies
- Apple JWKS
- Auth0 JWKS
- Google JWKS
- Google JWT
- Facebook
- Firebase
- Biometric
- OneLogin
- Local JWT
- Local cookies

## Contribution

RPs, especially with new providers, are welcome
