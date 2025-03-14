# Building
FROM maven:3.9.9-eclipse-temurin-21-alpine as build
WORKDIR /app
COPY . ./food-delivery-server
WORKDIR /app/food-delivery-server
RUN mvn clean package -DskipTests

# Running
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/food-delivery-server/target/food_delivery-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
