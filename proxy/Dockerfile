FROM nginx
ARG CONF_PATH
RUN echo "$CONF_PATH"
COPY "$CONF_PATH" /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]