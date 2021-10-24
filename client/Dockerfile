# => Build container
FROM node:alpine as build

RUN mkdir -p /usr/src/node-client && chown -R node:node /usr/src/node-client

WORKDIR /usr/src/node-client

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

RUN yarn build

FROM nginx:stable

COPY --from=build /usr/src/node-client/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]