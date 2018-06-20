FROM node:10.3-alpine

# Install git to make `jest --watch` work property
RUN apk update \
  && apk upgrade \
  && apk add --no-cache git

WORKDIR /usr/app
COPY ./storage/package*.json /

RUN npm install
COPY ./storage/ /