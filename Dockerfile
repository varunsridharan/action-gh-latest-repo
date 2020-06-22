FROM node:lts-alpine

RUN apk add git

COPY entrypoint.sh /entrypoint.sh

COPY node-app /github-latest-repo-node-app/

RUN chmod 777 entrypoint.sh

RUN chmod -R 777 /github-latest-repo-node-app/

ENTRYPOINT ["/entrypoint.sh"]

