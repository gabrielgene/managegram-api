FROM mhart/alpine-node
WORKDIR /app
COPY . .
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY — from=0 /app/build .
CMD [“serve”, “-p 80”, “-s”, “.”]
