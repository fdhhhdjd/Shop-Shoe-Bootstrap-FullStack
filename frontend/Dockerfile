FROM node:slim
RUN mkdir -p /usr/src/app
WORKDIR /app
COPY ["package.json","package-lock.json","./"]
RUN npm install 
COPY . . 
EXPOSE 3000
CMD [ "npm","start"]    