FROM spiceai/spiceai:latest-models

# Copy the Spicepod configuration file
COPY spicepod.yaml /app/spicepod.yaml

WORKDIR /app

EXPOSE 8090
EXPOSE 9090
EXPOSE 50051

CMD ["--http","0.0.0.0:8090","--metrics", "0.0.0.0:9090","--flight","0.0.0.0:50051"]
