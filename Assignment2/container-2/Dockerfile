FROM openjdk:19
VOLUME /app
EXPOSE 6001
ARG JAR_FILE=target/container-2-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]