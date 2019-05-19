FROM node:7
COPY ["package.json", "package-lock.json*", "app.js", "./"]
RUN npm install
ENTRYPOINT [ "node", "app.js" ]