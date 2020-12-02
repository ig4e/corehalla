#!/bin/bash

HOST="$1"
PORT="$2"
USERNAME="$3"
KEY="$4"
TEST="$5"

echo "test: ${TEST}"

TEMP=$(mktemp /tmp/temporary-file.XXXXXXXX)
echo "${KEY}" > ${TEMP}

ADDR="${USERNAME}@${HOST}"

scp -i ${TEMP} -P ${PORT} -r dist ${ADDR}:~/corehalla

rm -rf dist
mkdir dist
mkdir dist/api


# --- STATIC FILES --- #
cd app
yarn
yarn build
cd ..

cp -r static dist/static

# --- SERVER --- #
cp -r server dist/server


# --- API --- #
cd api
yarn
yarn build
yarn install --production --ignore-scripts --prefer-offline
cd ..

mv api/dist dist/api
cp api/Dockerfile dist/api/Dockerfile
cp api/package.json dist/api/package.json
cp api/yarn.lock dist/api/yarn.lock

# --- DOCKER --- #
cp .dockerignore dist/.dockerignore
cp docker-compose.yml dist/docker-compose.yml

# --- COPY DIST FOLDER VIA SSH --- #
scp -i ${TEMP} -P ${PORT} -r dist ${ADDR}:~/corehalla

ssh -i ${TEMP} -p ${PORT} ${ADDR} "
    cd ~/corehalla
    docker-compose up -d --build
"

exit