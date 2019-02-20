FROM node:9 as builder

LABEL description="Landingpage for 'what the street'"
LABEL project="lab-whatthestreet"
LABEL maintainer="florian.porada@moovel.com"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:9

WORKDIR /usr/src/app

# Install mongodb on Debian 8 (jessie)
RUN apt-get update
# Install old package so the service config will be present in /etc/init.d/
RUN apt-get install -y mongodb
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
RUN echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/4.0 main" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list
RUN apt-get update
RUN apt-get install -y mongodb-org
RUN mkdir -p /data/db

COPY --from=builder /usr/src/app/.next /usr/src/app/.next
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/server /usr/src/app/server
COPY --from=builder /usr/src/app/static /usr/src/app/static
COPY --from=builder /usr/src/app/config.json /usr/src/app/
COPY --from=builder /usr/src/app/next.config.js /usr/src/app/
COPY --from=builder /usr/src/app/gifgallery.json /usr/src/app/
COPY --from=builder /usr/src/app/package.json /usr/src/app/
COPY --from=builder /usr/src/app/docker-entrypoint.sh /usr/src/app/

# Create volume for persistant data
VOLUME [ "/var/lib/mongodb" ]

# We need to env var only at runtime with whatthestreet
ARG mapbox_token
ENV env_mapbox_token=$mapbox_token
ARG ga_id
ENV env_ga_id=$ga_id
#eg: /project/flightstorome
ARG URL_PREFIX="" 
ENV URL_PREFIX $URL_PREFIX
#eg: whatthestreet.moovellab.com
ARG ROOT_URL=""
ENV ROOT_URL $ROOT_URL

EXPOSE 80

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]

CMD ["npm", "start"]