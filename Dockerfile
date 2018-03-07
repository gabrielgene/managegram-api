FROM node:8.9.1

RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN cd client; yarn; yarn build

EXPOSE 8080
