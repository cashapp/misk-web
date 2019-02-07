FROM node:10-alpine

RUN apk add --no-cache tini git \
  && mkdir -p /node_modules \
  && npm install --prefix / \
  @misk/cli \
  @misk/common \
  @misk/components \
  @misk/core \
  @misk/dev \
  @misk/tslint \
  && npm install -g @misk/cli @misk/common @misk/components @misk/core @misk/dev @misk/tslint cross-env prettier webpack webpack-cli webpack-dev-server

ENV NODE_PATH='/node_modules'
COPY misk-web /bin/
WORKDIR /web
ENTRYPOINT ["/sbin/tini", "--"]
CMD tail -f /dev/null
