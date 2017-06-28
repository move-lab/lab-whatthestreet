# The Mobility Space Report: What the Street!?
**Part 2: Front & Backend**

![screen shot 2017-06-27 at 19 11 42](https://user-images.githubusercontent.com/533590/27597962-b001f55c-5b6c-11e7-97e4-d3fef2033637.png)

[*What the Street!?*](http://whatthestreet.moovellab.com/) was derived out of the question “How do new and old mobility concepts change our cities?”. It was raised by [Michael Szell](http://lab.moovel.com/people/michael-szell) and [Stephan Bogner](http://lab.moovel.com/people/stephan-bogner) during their residency at [moovel lab](http://lab.moovel.com/). With support of the lab team they set out to wrangle data of cities around the world to develop and design this unique *Mobility Space Report*.

*What the Street!?* was made out of open-source software and resources. Thanks to the OpenStreetMap contributors and many other pieces we put together the puzzle of urban mobility space seen above.

Implemented project URL: [http://whatthestreet.moovellab.com/](http://whatthestreet.moovellab.com/)

Read more about the technical details behind *The Mobility Space Report: What the Street!?* on our blog: [http://lab.moovel.com/blog/about-what-the-street](http://lab.moovel.com/blog/about-what-the-street)

[Demo Video](https://www.youtube.com/watch?v=QxRr3CSfp8E)

## Codebase
The complete codebase consist of two independent parts:

1. Data Wrangling
2. Front & Backend

This is part 2. You can find part 1 here: TODO URL

## General architecture

*What the Street!?* runs with:

- A node.js app (using express.js) that serves the front-end (this repo), the front-end based on react.js using [next.js](https://github.com/zeit/next.js) 
- A mongodb server which contains the data needed for the node.js app
- An external script to generate the video "gifs" of uncoiling the streets (not needed to run the app - they are generated before end)

You need node.js and mongodb installed on the machine in order to run the project.

## Note about code quality

The code has been forked during the project development from another codebase, and as we have been iterating fast to meet the deadline, there is not much style consistency between code ported from previous codebase and new code. For example: redux state management using some simple files containing all logic, but also in splitted files, variable naming, etc. However, this shouldn't impact the understanding of the codebase. 

That said, this project wouldn't run well if the codebase wasn't correctly optimized. We took care of using best practices of front-end development to deliver a smooth interface, such as using PureComponent, requestAnimationFrame, prefetching, immutable data structures, server side rendering, avoiding costly dom operations during animation, etc. 

## Deployment guide

### Loading data into the mongodb database

Mongodb is not auth configured (no password / username)

To import the data into the mongodb, you should:

- download an example city from that link TODO REPLACE LINK HERE , AND REPLACE CITY NAME BELOW

- import  the data with this command (you need to import each city in this db name schema:  ${cityname}_coiled_2 )

```
mongorestore
   --nsInclude 'london_coiled.*' 
   --nsFrom 'london_coiled.$collection$' 
   --nsTo 'london_coiled_2.$collection$' 
   --gzip 
   --archive=london/coils\ MongoDB\ Dump/london_coiled.gz
```

- Double check the data is imported by running

```
mongo
show dbs
```
You should see something like:
```
berlin_coiled_2      0.192GB
```

### Node.js front-end app deployment

- Copy this repo (you can exclude the documents folder)
- Configure the config.json file with your Mapbox token and analytics: https://github.com/moovel/lab-what-the-street/blob/master/config.json

```
npm install
npm run build (takes a while)
npm run start (will listen on the PORT variable or on 4000 if not set)
```

### Env variable

You can customize those env variable to change the default:

```
MONGODB_HOST (default: localhost)
MONGODB_PORT (default: 27017)
PORT (default: 4000 , port the http server is listening to)
```

## "GIF" recorder

We implemented a script that uses phantomjs to record mp4 files of the uncoiling animations - you can find it here: [https://github.com/moovel/lab-what-the-street/blob/master/recorder/main.sh](https://github.com/moovel/lab-what-the-street/blob/master/recorder/main.sh) (used on Mac OS X, did not test on linux)

Dependencies:

- phantomjs
- ffmpeg

To run it, use:

```
./main.sh $CITY $MOBILITY_TYPE $STREET_ID
ex: ./main.sh berlin car 3
```

It will output the video file in the `recorder/data/${city}` folder.

The core of the script is [https://github.com/moovel/lab-what-the-street/blob/master/recorder/record.js](https://github.com/moovel/lab-what-the-street/blob/master/recorder/record.js), the principle of recording an animation with phantom are:

- Implement the animation with a slowdow factor because phantomjs can't get frames at 30 FPS (the separate implementation can be found here: [https://github.com/moovel/lab-what-the-street/blob/master/app/mapmobile/MapMobile.js](https://github.com/moovel/lab-what-the-street/blob/master/app/mapmobile/MapMobile.js), and here [you can see it](http://whatthestreet.moovellab.com/berlin/mapmobile/car/lanes/41?bike=0.33&rail=0.33&car=0.33))

- Notify phantom when we are ready to animate ([https://github.com/moovel/lab-what-the-street/blob/master/app/mapmobile/MapMobile.js#L281](https://github.com/moovel/lab-what-the-street/blob/master/app/mapmobile/MapMobile.js#L281))

- Phantom will take screenshots at 10 FPS and then we transform the frames into a video using ffmpeg ([https://github.com/moovel/lab-what-the-street/blob/master/recorder/main.sh#L14](https://github.com/moovel/lab-what-the-street/blob/master/recorder/main.sh#L14))

It turned out that we were able to generate 20 cities in parallel on the same machine, so we didn't need to automate the uploading to s3, but here is [some script that can help to do so](https://github.com/moovel/lab-what-the-street/blob/master/recorder/uploadS3.js). 

## Team

#### Concept and Coding
- [Michael Szell](http://lab.moovel.com/people/michael-szell)
- [Stephan Bogner](http://lab.moovel.com/people/stephan-bogner)

#### Direction
[Benedikt Groß](http://lab.moovel.com/people/benedikt-gross)

#### Website Front & Backend Engineering
[Thibault Durand](http://thibault-durand.fr/)

#### Website Implementation Assistant
Tobias Lauer

#### Visual Design
[Anagrama](https://www.anagrama.ro/)

#### Extended Team

- [Raphael Reimann](http://lab.moovel.com/people/raphael-reimann)
- [Joey Lee](http://lab.moovel.com/people/joey-lee)
- [Daniel Schmid](http://lab.moovel.com/people/daniel-schmid)
- [Tilman Häuser](http://lab.moovel.com/people/tilman-haeuser)

#### City Data Wrangling Assistant
[Johannes Wachs](http://johanneswachs.com/)

#### Data Sources
OpenStreetMap, a free alternative to services like Google Maps. Please contribute, if you notice poor data quality.

[https://donate.openstreetmap.org/](https://donate.openstreetmap.org/)
