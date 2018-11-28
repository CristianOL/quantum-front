#Compilar ficheros
FROM node AS compiler
WORKDIR /front
COPY ./frontend .
RUN yarn install && \
    yarn run build && \
    ls /front

#Levantar servidor
FROM nginx

WORKDIR /usr/share/nginx/html
COPY --from=compiler /front/dist .

#EXPOSE 80



