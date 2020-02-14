# Vehicle Manager

> All commands must be executed at the root of the project

## How to prepare the env
``` bash
npm --prefix api install
npm --prefix api run build

npm --prefix back-end install
npm --prefix back-end run set-env

npm --prefix front-end install
npm --prefix front-end run set-env
```

## How to execute the project

1. Start the back-end:
```
npm --prefix back-end start
```

2. On other terminal, start the front-end:
```
npm --prefix front-end start
```

3. Open your browser at `http://localhost:1234/`

## How to run the tests
```
npm --prefix back-end test
```