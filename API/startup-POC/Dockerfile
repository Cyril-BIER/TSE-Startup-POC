FROM maven:3.8.8-eclipse-temurin-17-alpine

WORKDIR /app

COPY . /app

RUN mvn clean install

EXPOSE 8081

CMD ["java", "-jar", "target/api-0.0.1-SNAPSHOT.jar"]