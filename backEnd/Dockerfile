FROM node:16.0.0-alpine
WORKDIR /app
COPY package.json /app
RUN yarn
COPY . /app
CMD yarn deploy
EXPOSE 5000