FROM node:14.9.0-alpine3.12 as build
LABEL stage=build

WORKDIR /app

# Copying source files
COPY . .

# Installing dependencies
RUN yarn

# Building app
RUN yarn build

# Serve by nginx
FROM nginx:alpine

# Copy build files to nginx
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Overwrite default config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf