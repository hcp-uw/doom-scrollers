# Use the official Rust image as the base image
FROM rust:latest

RUN apt-get update && apt-get -y install protobuf-compiler

WORKDIR /app

COPY . .

RUN cargo build --release
RUN cargo build --release --bin agent-server
RUN cargo install --path .

EXPOSE 8089

CMD ["agent-server"]