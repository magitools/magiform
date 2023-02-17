# Ara

## Forms as a Service (kind of)

![Discord](https://img.shields.io/discord/937624611384864809)
![GitHub License](https://img.shields.io/github/license/magiform/ara)
[![Docker Image CI](https://github.com/magiform/ara/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/magiform/ara/actions/workflows/main.yml)

## Goal

the goal of this application is to provide an easy way to trigger events on a form submission. This is as easy as creating a form with our application and setting its url as the method for the `<form>` tag on your website.

## Deploy It

### Automatic
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/U1sRS6?referralCode=yz0ule)

### Manual

#### Docker

- create a `.env` file with the following values:
```
JWT_TOKEN=<your_jwt_token_here>
DATABASE_URL=<your_database_connection_string_here>
```
- pull the latest image

```sh
docker pull ghcr.io/magiform/era:main
```
- create the database
```sh
docker run --env-file .env ghcr.io/magiform/era:main npx prisma db push
```
- run the service
```sh
docker run --env-file .env ghcr.io/magiform/era:main
```

#### Process

- install pm2
```sh
npm install -g pm2@latest
```
- clone this repository
```sh
git clone https://github.com/magiform/ara.git
```
- cd into the repository
```sh
cd ara
```
- create a `.env` file with the following values:
```
JWT_TOKEN=<your_jwt_token_here>
DATABASE_URL=<your_database_connection_string_here>
```
- install dependencies
```sh
npm install
```

- create the database
```sh
npx prisma db push
```

- build application
```sh
npm run build
```
- start application
```
pm2 start "npm run start"
```

## Contributing

Still figuring it out, to be honest