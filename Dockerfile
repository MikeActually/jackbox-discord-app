FROM node:slim
WORKDIR /home/node/app
ADD . .
RUN yarn install --production