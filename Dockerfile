FROM node:latest AS builder
WORKDIR /usr/local/app
COPY . /usr/local/app/
RUN npm ci && npm run build yuforium-ui --prod

FROM nginx:latest
COPY --from=builder /usr/local/app/dist/yuforium-ui/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 4200
