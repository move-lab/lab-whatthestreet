# Lab What the street

# Deploy to Production Guide

## General

What the street works with

- A node.js app (using express.js) that serves the front-end (this repo)
- A mongodb server which contain the data needed for the node.js app

## Env variable:

You can customize those env variable to change the default:

- process.env.MONGODB_HOST (default: localhost)
- process.env.MONGODB_PORT (default: 27017)
- process.env.PORT (default: 4000 , port the http server is listening to)

## Deploy

### Mongodb load data in database

IN PROGRESS SCRIPT TO IMPORT DATA

### Node.js front-end app deployment

- Copy this repo (you can exclude the documents folder)
- npm install
- npm run build (takes a while)
- npm run start 

# Development Env

## Prerequisites

Before you get started, consider that your environment has the following (see below for set-up):

* Mongodb [installation](https://docs.mongodb.com/manual/installation/) with databases loaded

## Front-end and node.js express server

Using https://github.com/zeit/next.js/ for easy SSR rendering and routing

```
yarn install
yarn run dev
open browser on localhost:4000
```
Please note that switching between pages can be slow in dev mode, as prefetching is not enabled, to see performance in prod, you can run a prod build with these commands:

```
yarn install
yarn build (will take a while)
yarn start
open browser on localhost:4000
```

## Database set-up

**The moovel_web application allows configuration using these variables:**

* MONGODB_HOST= Mongodb_Host (default: localhost)

### Restore the downloaded Data

The project uses a mongodb for data persistence.

You'll find a dump [here](https://drive.google.com/open?id=0B1rJ3Te9mHugd1hzcVhtblYxblU)

After you have downloaded this archive you are provided with some bson files, that you can restore using the following command:

`mongorestore path/to/the/dezipped/archive/db/berlin_coiled/streets.bson`

Note that there are a few *.bson files. You have to repeat this command for each of them.

#### Check if the data import worked

After that you can run `mongo` to open the commandline of your mongodb

`show dbs`

If everything is handled correctly you'll get the following output:

| berlin_coiled | ?.???GB |
|---------------|---------|
| ...           | ?.???GB |


Congratulations.. now you can start setting up the app.


