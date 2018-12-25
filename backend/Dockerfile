FROM node:10-slim
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build-ts
EXPOSE 1337
RUN mv cloud_sql_proxy /usr/local/bin/
CMD ["npm start" , "cloud_sql_proxy -instances=gurschtracker-221622:europe-north1:dev=tcp:5432 -credential_file=/usr/app/secrets/gurschtracker-221622-1a4a08507bd3.json"]