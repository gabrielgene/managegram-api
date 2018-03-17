#!/bin/bash

NAME=insta-js YARN_ARG=start TAG=$(git rev-parse HEAD) ./k8s/template.sh | kubectl apply -f -
#NAME=cron-js CMD='yarn cron' ./template.sh | kubectl apply -f -
#NAME=worker-js CMD='yarn worker' ./template.sh | kubectl apply -f -
kubectl apply -f ./k8s/service.yaml
