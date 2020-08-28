FROM node:12.18
EXPOSE 8080
RUN apt-get update
RUN apt-get install git
RUN git clone https://github.com/DanCard0/qualification-backend.git
WORKDIR ./qualification-backend
RUN npm i
CMD [ "node", "app.js" ]