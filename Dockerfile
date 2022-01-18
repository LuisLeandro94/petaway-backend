#Image specification
FROM node:latest

#Environment variable settings
ENV NODE_ENV="development"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Bundle app source
COPY . ./code

# Install dependencies
COPY package.json ./code
COPY yarn.lock ./code

WORKDIR /usr/src/app/petaway-api
RUN yarn

# Exports
EXPOSE 5000

# ENTRYPOINT ["yarn","build"]