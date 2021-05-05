FROM node:14.16.1-alpine3.13 AS build

ARG NGINX_VERSION="1.20.0"
ARG NODE_VERSION="14.16.1-alpine3.13"
ARG REST_API_URL="http://localhost:4200/"

COPY . /workspace/

RUN cd /workspace/ && \
    npm install    && \
    REST_API_URL=${REST_API_URL}  npm run build -- --prod --configuration=production

FROM nginx:1.20.0 AS runtime


COPY ./nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*
COPY  --from=build /workspace/dist/ /usr/share/nginx/html/
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

EXPOSE 8080 

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
