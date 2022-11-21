FROM node:latest as builder
WORKDIR /usr/local/app
COPY . /usr/local/app/
RUN npm ci && npm run build test-app --prod

FROM nginx:latest
COPY --from=builder /usr/local/app/dist/test-app /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80