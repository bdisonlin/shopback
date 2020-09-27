# FROM nikolaik/python-nodejs:python3.8-nodejs12
FROM node:12
# RUN mkdir /project
# WORKDIR /project
# COPY requirements.txt /project/requirements.txt
# RUN pip install -r requirements.txt

WORKDIR /usr/src/app
COPY package*.json ./
COPY app ./
# RUN npm install
RUN npm init -y
RUN npm install express
RUN npm install cors
RUN npm install body-parser
# RUN npm install python-shell
RUN npm install mocha -g
RUN npm install mocha --save
RUN npm install should --save
RUN npm cache clean --force && npm install
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]