#!/usr/bin/env bash

set -e

plateform="linux/amd64,linux/arm64,linux/arm/v7"
image_name="ghcr.io/tfsheol/simple-todo"

cd ../frontend
npm install
npm run build:prod
cd -

cd ../backend
npm install
npm run build
cd -

docker buildx build --platform ${plateform} --no-cache --progress auto -t "${image_name}-frontend" -f ./Dockerfile.angular ../frontend/ --push
docker buildx build --platform ${plateform} --no-cache --progress auto -t "${image_name}-backend" -f ./Dockerfile.node ../backend/ --push
