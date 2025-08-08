FROM ubuntu:latest

RUN apt update
RUN apt upgrade -y

# NodeJs
RUN apt install nodejs -y
RUN apt install npm -y

# TypeScript
RUN npm install -g typescript ts-node

# GNU compiler
RUN apt install build-essential -y

# Java
RUN apt install default-jdk -y

# Python
RUN apt install python3 -y

# Go
RUN apt install golang -y