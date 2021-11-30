#Image specification
FROM node:latest

#Environment variable settings
ENV NODE_ENV="development"

#Create working directory&Configuration
WORKDIR /src

COPY /app /src

RUN yarn
