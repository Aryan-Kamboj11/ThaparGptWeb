# Stage 1: Build
FROM node:18.17.1-alpine as builder
WORKDIR /usr/src/app
COPY thapargpt-frontend/package.json .
COPY thapargpt-frontend/package-lock.json .
RUN npm ci --silent
COPY thapargpt-frontend/ .
RUN npm run build

# Stage 2: Run
FROM nginx:1.25.2-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY thapargpt-frontend/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]