FROM node:8.9.1

RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN cd client; yarn build

RUN yarn

EXPOSE 8080

CMD ["yarn", "start"]
