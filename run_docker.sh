#!/bin/sh
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d
docker exec -it petaway-api bash