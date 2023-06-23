FROM node:lts-alpine
WORKDIR /src/App
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm i
COPY . .
EXPOSE 3000
RUN chown -R node /src/App
USER node
CMD [ "npm", "run", "dev" ]
