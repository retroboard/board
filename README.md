# Board

[![CircleCI](https://circleci.com/gh/retroboard/board/tree/master.svg?style=svg)](https://circleci.com/gh/retroboard/board/tree/master)

RetroBoard is a secure, fast, private and collaborative board for retrospectives. We take your privacy very seriously, that's why RetroBoard is secure & private by design. RetroBoard is completely peer-to-peer and decentralized. We never process personal data, we don’t store such data centrally on a server. This means we can’t pass on or sell your data to third parties.

This project is a Work in Progress, you can check the demo on [https://retroboard.github.io/board](https://retroboard.github.io/board)

### Initial Setup

Requirements:
  - npm
  - node >~ v10.11.0

```
$ npm install
```

### Running locally

```
$ npm start
```

### Running the tests

```
$ npm test
```

### Running functional tests

```
$ ./node_modules/.bin/codeceptjs run --steps
```