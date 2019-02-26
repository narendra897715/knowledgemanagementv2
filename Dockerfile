FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html/
COPY ./dist/recruitee .
EXPOSE 80