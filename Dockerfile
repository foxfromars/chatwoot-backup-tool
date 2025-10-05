FROM postgres:16 AS postgres-stage

FROM node:20

RUN apt-get update && apt-get install -y libpq5 && rm -rf /var/lib/apt/lists/*

COPY --from=postgres-stage /usr/lib/postgresql/16/bin/pg_dump /usr/local/bin/pg_dump

RUN chmod +x /usr/local/bin/pg_dump

WORKDIR /home/node/app
COPY . .
RUN npm install
RUN npm run build
CMD /bin/bash
# replace this with your application's default port
EXPOSE 8080
