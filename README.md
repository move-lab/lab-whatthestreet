# The Mobility Space Report: What the Street!?

![screen shot 2017-06-27 at 19 11 42](https://user-images.githubusercontent.com/533590/27597962-b001f55c-5b6c-11e7-97e4-d3fef2033637.png)

[Demo Video](https://www.youtube.com/watch?v=QxRr3CSfp8E)

## General

What the street works with

- A node.js app (using express.js) that serves the front-end (this repo)
- A mongodb server which contain the data needed for the node.js app

You need node.js , mongodb installed on the server

## Env variable:

You can customize those env variable to change the default:

- MONGODB_HOST (default: localhost)
- MONGODB_PORT (default: 27017)
- PORT (default: 4000 , port the http server is listening to)

## Deploy

### Mongodb load data in database

Mongodb has not auth configured (no password / username)

To import the data in the mongodb, you should:

- download data from the Google drive: https://drive.google.com/drive/folders/0B1rJ3Te9mHugd1hzcVhtblYxblU?usp=sharing 

- copy the mongoimport.sh script that is at the root of this repository to the folder you just downloaded.

Eg: you should have this kind of tree structure:

![screen shot 2017-06-13 at 09 05 30](https://user-images.githubusercontent.com/533590/27068220-9621dfd6-5017-11e7-90d6-e77e99023b74.png)

- run the script ./mongoimport.sh 

- this script should unzip the data for each city and import it in the mongodb, it is also trashing any previous data to make sure we have the new data when updating.

### Node.js front-end app deployment

- Copy this repo (you can exclude the documents folder)
- npm install
- npm run build (takes a while)
- npm run start (will listen on the PORT variable or on 4000 is not set)
