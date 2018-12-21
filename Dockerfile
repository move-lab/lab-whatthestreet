FROM node:8 as builder

LABEL description="Landingpage for 'what the street'"
LABEL project="lab-whatthestreet"
LABEL maintainer="florian.porada@moovel.com"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:8

WORKDIR /usr/src/app

# Install mongodb
RUN apt-get update
RUN apt-get install -y mongodb
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

EXPOSE 80

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]

CMD ["npm", "start"]