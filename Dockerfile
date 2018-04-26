FROM node:alpine

ENV CONTAINER_HOME=/usr/src/strimpack-web-client
WORKDIR $CONTAINER_HOME

COPY package*.json ./
RUN npm install --only=production
COPY . ./

CMD ["npm", "run", "build"]
