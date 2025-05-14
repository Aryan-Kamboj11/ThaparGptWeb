# Stage 1: Build
FROM node:18 as builder
WORKDIR /app
COPY thapargpt-frontend/package.json .
COPY thapargpt-frontend/package-lock.json .
RUN npm install
COPY thapargpt-frontend/ .
RUN npm run build

# Stage 2: Run
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80