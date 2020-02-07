FROM node:alpine3.11

RUN npm install -g serve

RUN mkdir /app
COPY ./build /app

WORKDIR /app/
ENTRYPOINT [ "/usr/local/bin/serve -s" ]
