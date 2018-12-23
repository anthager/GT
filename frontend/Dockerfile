FROM node:10 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm install
RUN npm install react-scripts@1.1.1 -g
COPY . /usr/src/app
RUN react-scripts build


FROM nginx:1.15-alpine
RUN rm -rf /etc/nginx/conf.d
COPY server/prod.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'