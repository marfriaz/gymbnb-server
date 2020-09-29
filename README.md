# Gymbnb API

## Introduction

Gymbnb: a local home gym marketplace. Users can book local home gyms in their area and hosts can list their home gym.

This repo is the backend for Gymbnb. You can see the Live Demo at: [https://gymbnb-client.vercel.app](https://gymbnb-client.vercel.app)

The front end client can be found at [https://github.com/marfriaz/gymbnb-client](https://github.com/marfriaz/gymbnb-client).

To try out this app, you can create a new account from the Sign Up page or use the Demo Account listed below.

#### Demo Account Details

- Email: user@gmail.com
- Password: password

## Features

- Search gyms by location
- "Email Host" malito link connected to host's email
- "Host a Gym" form for listing home gyms onto the platform
- "Sign Up" form
- "Login" form

## Motivation

During SF's covid stay at home mandate, my gym was shutdown without a forseeable date of re-opening. Working out is an important ordeal for me, it enhances my mood and keeps me grounded, so I decided to build my own home gym (featured on this Web App). The gym equipment was pricey and I'm the only one using it! My friends would occasionally ask to use my home gym as they didn't own their own equipment. Hence, I created Gymbnb: a local home gym marketplace.

## Video Demos

[![Watch the video](https://i.imgur.com/NvdEQju.png)](https://www.youtube.com/watch?v=TUgLHtagTTQ&feature=youtu.be&ab_channel=MarcoFriaz)

- [Gymbnb (Youtube Vid Demo)](https://www.youtube.com/watch?v=TUgLHtagTTQ&feature=youtu.be&ab_channel=MarcoFriaz)

[![Watch the video](https://i.imgur.com/NvdEQju.png)](https://www.youtube.com/watch?v=vccD64fxJ2M&feature=youtu.be&ab_channel=MarcoFriaz)

- [Gymbnb Login (Youtube Vid Demo)](https://www.youtube.com/watch?v=vccD64fxJ2M&feature=youtu.be&ab_channel=MarcoFriaz)

## Technology

#### Back End

- Node and Express
  - Authentication via JWT
  - RESTful Api
- Testing
  - Supertest (integration)
  - Mocha and Chai (unit)
- Database
  - Postgres
  - Knex.js - SQL wrapper

#### Production

Deployed via Heroku

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone https://github.com/marfriaz/gymbnb-server.git NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
