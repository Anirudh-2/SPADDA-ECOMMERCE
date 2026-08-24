FROM node:20-alpine AS frontend
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM maven:3.9-eclipse-temurin-17 AS backend
WORKDIR /app
COPY backend/ ./backend/
COPY --from=frontend /frontend/dist ./frontend/dist
WORKDIR /app/backend
RUN mvn -q -DskipTests package

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S spadda && adduser -S spadda -G spadda
COPY --from=backend /app/backend/target/spadda-backend-1.0.0.jar app.jar
USER spadda
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]
