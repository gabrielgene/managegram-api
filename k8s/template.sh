#!/bin/bash

cat <<EOF
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: ${NAME}
  name: ${NAME}
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: ${NAME}
    spec:
      containers:
      - args:
        - yarn
        - ${YARN_ARG}
        image: gabrielgene/${NAME}
        name: ${NAME}
EOF
