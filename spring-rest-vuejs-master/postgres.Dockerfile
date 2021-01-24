FROM postgres:9.6-alpine
COPY ./postgresInit.sql /docker-entrypoint-initdb.d/