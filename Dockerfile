FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY build/libs/demo-heap-monitor-0.0.1-SNAPSHOT.jar app.jar
ENV JAVA_TOOL_OPTIONS="-XX:+UseContainerSupport -XX:+UseG1GC -XX:MaxRAMPercentage=65 -XX:MinHeapFreeRatio=10 -XX:MaxHeapFreeRatio=30"
ENTRYPOINT ["java","-jar","/app/app.jar"]
