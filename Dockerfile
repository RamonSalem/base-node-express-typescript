FROM node:lts-hydrogen


RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json tsconfig.json ./
RUN  npm install

COPY ./src ./src

RUN npm run build

RUN npm prune --omit=dev

RUN mkdir -p protected/

ENV NODE_ENV=production

CMD ["node", "./build/index.js"]
