###############################################################################################
# Questionary
###############################################################################################
FROM node:latest as questionary

WORKDIR /usr/src/app

# update the image
RUN apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update
RUN apt-get upgrade -y
RUN apt-get install vim -y
RUN apt-get install net-tools -y

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install --only=production && npm cache clean --force --loglevel=error
COPY . .
RUN npm run build

RUN chmod +x docker/entrypoint.sh

# publish app
EXPOSE 8080
ENTRYPOINT [ "docker/entrypoint.sh" ]