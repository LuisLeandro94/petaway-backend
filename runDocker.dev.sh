#!/bin/sh
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up -d
docker exec -it n-app bash