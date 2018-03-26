#!/bin/bash

cat <<EOF
apiVersion: extensions/v1beta2
kind: Deployment
metadata:
  labels:
    app: ${APP}
  name: ${APP}
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: ${APP}
    spec:
      containers:
        resources:
          requests:
            cpu: "0.1"
      - args:
        - yarn
        - ${YARN_ARG}
        image: gabrielgene/${IMAGE}:${TAG}
        name: ${APP}
EOF
