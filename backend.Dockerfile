# Build stage
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
# Copy the backend folder contents to the container's /app
COPY backend/ . 
RUN chmod +x gradlew
RUN ./gradlew build -x test --no-daemon

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Dserver.port=${PORT:-8080}", "-jar", "app.jar"]
