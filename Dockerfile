#Image specification
FROM node:latest

#Environment variable settings
ENV NODE_ENV="development"

#Create working directory&Configuration
WORKDIR /app

COPY ./app /app

RUN yarn

