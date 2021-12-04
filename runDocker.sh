#!/bin/sh
docker-compose build
docker-compose up -d
docker exec -it n-app bash