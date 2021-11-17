FROM node:16-alpine3.14

RUN apk add bash

ENV LANG=ko_KR.UTF-8 \
    LANGUAGE=ko_KR.UTF-8

# Set the timezone in docker
RUN apk --no-cache add tzdata && \
        cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
        echo "Asia/Seoul" > /etc/timezone

WORKDIR /app

COPY yarn.lock ./
COPY package.json ./

RUN yarn install

COPY . . 

EXPOSE 3000

CMD ["yarn", "prod:ts"]