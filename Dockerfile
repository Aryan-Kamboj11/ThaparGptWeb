# Stage 1: Build
FROM node:18 as builder
WORKDIR /app
COPY thapargpt-frontend/package.json thapargpt-frontend/package-lock.json ./
RUN npm install
COPY thapargpt-frontend/ .
RUN npm run build

# Stage 2: Run
FROM node:18
WORKDIR /app
COPY --from=builder /app/build ./build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]