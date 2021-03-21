#!/usr/bin/env bash

set -e

plateform="linux/amd64,linux/arm64"
image_name="ghcr.io/tfsheol/simple-todo"

docker buildx build --platform ${plateform} --no-cache --progress auto -t "${image_name}" -f ./Dockerfile.angular ../ --push