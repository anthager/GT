FROM node:10-slim
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build-ts
EXPOSE 1337
CMD ["npm", "start"]