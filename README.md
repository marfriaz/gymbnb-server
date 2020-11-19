# Gymbnb API

## Introduction

Gymbnb: a local home gym marketplace. Users can book local home gyms in their area and hosts can list their home gym.

This repo is the backend for Gymbnb. You can see the Live Demo at: [https://gymbnb-client.vercel.app](https://gymbnb-client.vercel.app)

The front end client can be found at [https://github.com/marfriaz/gymbnb-client](https://github.com/marfriaz/gymbnb-client).

To try out this app, you can create a new account from the Sign Up page or use the Demo Account listed below.

#### Demo Account Details

- Email: user@gmail.com
- Password: password

## Technology (for API)

#### Back End

- Node and Express
  - Express Router
  - Authentication via JWT
  - RESTful API
- Integration Testing
  - Supertest
  - Mocha
  - Chai
- Database
  - PostgreSQL
  - Knex.js
  - SQL

#### Production

- Deployed via Heroku

## Features

- 3 database tables: gyms (listings), users and images
- Authentication via JWT
- XSS Middleware

## Motivation

During SF's covid stay at home mandate, my gym was shutdown without a forseeable date of re-opening. Working out is an important ordeal for me, it enhances my mood and keeps me grounded, so I decided to build my own home gym (featured on this Web App). The gym equipment was pricey and I'm the only one using it! My friends would occasionally ask to use my home gym as they didn't own their own equipment. Hence, I created Gymbnb: a local home gym marketplace.

## Entity Relationship Diagram (ERD)

![ERD](https://i.imgur.com/ykVwYUw.png)

## Video Demos

#### Video Demos in mobile viewport but this App supports a responsive design

- [Gymbnb (Youtube Vid Demo)](https://www.youtube.com/watch?v=TUgLHtagTTQ&feature=youtu.be&ab_channel=MarcoFriaz)

[![Watch the video](https://i.imgur.com/NvdEQju.png)](https://www.youtube.com/watch?v=TUgLHtagTTQ&feature=youtu.be&ab_channel=MarcoFriaz)

- [Gymbnb Login (Youtube Vid Demo)](https://www.youtube.com/watch?v=vccD64fxJ2M&feature=youtu.be&ab_channel=MarcoFriaz)]

  [![Watch the video](https://i.imgur.com/NvdEQju.png)](https://www.youtube.com/watch?v=vccD64fxJ2M&feature=youtu.be&ab_channel=MarcoFriaz)

## Getting Started

Major dependencies for this repo include Postgres and Node.

To get setup locally, do the following:

1. Clone this repository to your machine, cd into the directory and run npm install
2. Create the dev and test databases: createdb -U postgres -d gymbnb and createdb -U postgres -d gymbnb-test

3. Create a `.env` and a `.env.test` file in the project root

Inside these files you'll need the following:

```
NODE_ENV=development
PORT=8000
DATABASE_URL="postgresql://postgres@localhost/gymbnb"
TEST_DATABASE_URL="postgresql://postgres@localhost/gymbnb-test"
```

4. Run the migrations for dev - `npm run migrate`
5. Run the migrations for test - `npm run migrate:test`
6. Seed the database for dev

- `psql -U postgres -d gymbnb -f ./seeds/seed.gymbnb_tables.sql`
- `psql -U postgres -d gymbnb-test -f ./seeds/seed.gymbnb_tables.sql`

7. Run the tests - `npm t`
8. Start the app - `npm run dev`
