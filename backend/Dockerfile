FROM gradle:8-jdk21 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon -x test

FROM eclipse-temurin:21-jre-alpine
EXPOSE 8080
WORKDIR /app
COPY --from=build /home/gradle/src/build/quarkus-app/lib/ /app/lib/
COPY --from=build /home/gradle/src/build/quarkus-app/*.jar /app/
COPY --from=build /home/gradle/src/build/quarkus-app/app/ /app/app/
COPY --from=build /home/gradle/src/build/quarkus-app/quarkus/ /app/quarkus/
ENTRYPOINT ["java", "-jar", "/app/quarkus-run.jar"]
