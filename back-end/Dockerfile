FROM node:14

#create app directory
WORKDIR /usr/src/app

#install dependencies
COPY package*.json ./

RUN npm install

#copy source code into image
COPY . .

EXPOSE 4000

#start application
CMD ["npm", "start"]