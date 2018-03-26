#!/bin/bash

IMAGE=insta-js APP=insta-js YARN_ARG=start TAG=$(git rev-parse HEAD) ./k8s/template.sh | kubectl apply -f -
IMAGE=insta-js APP=cron-js YARN_ARG=cron TAG=$(git rev-parse HEAD) ./k8s/template.sh | kubectl apply -f -
IMAGE=insta-js APP=worker-js YARN_ARG=worker TAG=$(git rev-parse HEAD) ./k8s/template.sh | kubectl apply -f -

# kubectl apply -f ./k8s/service.yaml
