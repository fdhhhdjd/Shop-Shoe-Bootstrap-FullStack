FROM node:slim
RUN mkdir -p /usr/src/app
WORKDIR /app
COPY ["package-lock.json","package.json","./"]
RUN npm install --production
COPY . . 
EXPOSE 3000
CMD [ "npm","start"]    