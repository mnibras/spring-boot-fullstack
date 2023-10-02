# Use a Maven image as the build stage
FROM maven:3.9.4-eclipse-temurin-17-alpine AS build

# Set the working directory
WORKDIR /app

# Copy only the POM file to cache dependencies
COPY pom.xml .

# Copy the rest of the application source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use an eclipse-temurin:17-alpine image as the final stage
FROM eclipse-temurin:17-alpine

# Copy the JAR file built in the previous stage
COPY --from=build /app/target/amigoscode-api.jar .

# Expose the port your Spring Boot application will listen on (default is 8080)
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "amigoscode-api.jar"]
