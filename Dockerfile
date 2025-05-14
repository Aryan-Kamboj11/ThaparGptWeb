# Stage 1: Build
FROM node:18.17.1-alpine AS builder
WORKDIR /app
COPY thapargpt-frontend/package.json .
COPY thapargpt-frontend/package-lock.json .
RUN npm ci
COPY thapargpt-frontend/ .
RUN npm run build

# Stage 2: Run
FROM nginx:1.25.2-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY thapargpt-frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80