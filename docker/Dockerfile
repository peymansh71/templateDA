FROM node:14.9.0-alpine3.12 as build

WORKDIR /app

# Copying source files
COPY . .

# Installing dependencies
RUN yarn

# Building app
RUN yarn build

# Serve by nginx
FROM nginx:alpine

COPY --from=build /app/dist/ /usr/share/nginx/html/
