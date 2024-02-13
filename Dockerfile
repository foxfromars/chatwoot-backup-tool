# specify the node base image with your desired version node:<version>
FROM node:20
WORKDIR /home/node/app
COPY . .

RUN apt-get update -qq 
RUN apt-get install -y postgresql-client neovim htop iputils-ping sudo
RUN npm install
RUN npm run build

CMD /bin/bash
# replace this with your application's default port
EXPOSE 8080
