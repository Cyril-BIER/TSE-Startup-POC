FROM maven:3.8.8-eclipse-temurin-21-alpine

WORKDIR /app

COPY . /app

RUN mvn clean install

EXPOSE 8081

CMD ["java", "-jar", "target/startup-POC-0.0.1-SNAPSHOT.jar"]