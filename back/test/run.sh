#!/usr/bin/env bash

# run unit tests
npm run test:unit

# run local redis instance
docker run \
--rm \
-p 6379:6379 \
-d \
--name \
tmp-local-redis redis

# compile the source
npm run build

# run the node instance
ENV=dev \
DB_URL=redis://localhost:6379 \
DB_INTERFACE=./redis.js \
COLS=students,courses \
PORT=3000 \
node dist &

# store the node pid
process_id=$!

# run e2e tests and store exit code
npm run test:e2e
ee_result=$?

# kills the node main process
kill $process_id

# stop redis instance
docker stop tmp-local-redis

# checks the exit code
if [ $ee_result -ne 0 ]; then
  echo "KO"
  exit 1
fi
echo "OK"
