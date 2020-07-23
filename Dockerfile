FROM node:10.15-alpine


WORKDIR /usr/src/app

RUN npm init -f

RUN npm install express --save

RUN npm install express-http-proxy --save

RUN npm install

COPY . .

#RUN echo "const express = require('express');const path = require('path');const http = require('http');const bodyParser = require('body-parser');const app = express(); app.use(bodyParser.json());app.use(bodyParser.urlencoded({ extended: false })); app.use(express.static(path.join(__dirname, '')));app.get('*', (req, res) => {res.sendFile(path.join(__dirname, 'index.html'));});const port = process.env.PORT || '3002';app.set('port', port);const server = http.createServer(app); server.listen(port, () => console.log(`API running on localhost:`));" > server.js

#COPY package*.json ./

#RUN npm install

#COPY . .

#RUN npm uninstall -g angular-cli && \
    #npm uninstall -g @angular/cli && \
    #npm cache clean --force && \
    #npm install -g @angular/cli && \
    #ng build --prod

EXPOSE 3002

CMD [ "node", "server.js" ]

