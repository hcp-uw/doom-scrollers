FROM spiceai/spiceai:latest

# Copy the Spicepod configuration file
COPY spicepod.yaml /app/spicepod.yaml

WORKDIR /app

# Spice runtime start-up arguments

EXPOSE 8090
EXPOSE 9090
EXPOSE 50051

CMD ["--http","0.0.0.0:8090","--metrics", "0.0.0.0:9090","--flight","0.0.0.0:50051"]
