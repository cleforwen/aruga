# Build stage: Compile native executable using Mandrel (GraalVM)
FROM quay.io/quarkus/ubi-quarkus-mandrel-builder-image:jdk-21 AS build
COPY --chown=quarkus:quarkus gradlew /code/gradlew
COPY --chown=quarkus:quarkus gradle /code/gradle
COPY --chown=quarkus:quarkus build.gradle /code/
COPY --chown=quarkus:quarkus settings.gradle /code/

USER quarkus
WORKDIR /code
COPY src /code/src

# Make sure the gradle wrapper is executable, then build the native image
RUN chmod +x gradlew && ./gradlew build -Dquarkus.package.type=native -x test

# Serve stage: Minimal micro image for running the native binary
FROM quay.io/quarkus/ubi9-quarkus-micro-image:2.0
WORKDIR /work/
COPY --from=build /code/build/*-runner /work/application
RUN chmod 775 /work
EXPOSE 8080
CMD ["./application", "-Dquarkus.http.host=0.0.0.0"]
