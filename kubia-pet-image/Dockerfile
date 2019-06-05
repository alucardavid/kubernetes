FROM node:7
COPY . /
#COPY ["package.json", "package-lock.json*", "app.js", "/data/.", "/dao/", "./"]
RUN npm install
ENTRYPOINT [ "node", "app.js" ]