# specify the node base image with your desired version node:<version>
FROM node:20
WORKDIR /home/docker/app
COPY . .

RUN apt-get update -qq 
RUN apt-get install -y postgresql-client neovim htop iputils-ping sudo
RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo
RUN npm install
RUN npm run build

USER docker
CMD /bin/bash
# replace this with your application's default port
EXPOSE 8080
