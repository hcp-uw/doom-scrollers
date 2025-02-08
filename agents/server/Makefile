.PHONY: build
build:
	docker build -t agent-server-image .

.PHONY: run
run:
	docker run --name agent-server -p 8089:8089 --restart unless-stopped agent-server-image