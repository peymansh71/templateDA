FROM node as build

WORKDIR /app

# Copying source files
COPY . .

# Installing dependencies
RUN yarn

# Building app
RUN yarn build

# Serve by nginx
FROM nginx:alpine

COPY --from=build /app/build/ /usr/share/nginx/html/
