.PHONY: generate_grpc_code
generate_grpc_code:
	protoc \
	--go_out=agent_service \
	--go_opt=paths=source_relative \
	--go-grpc_out=agent_service \
	--go-grpc_opt=paths=source_relative \
	agent_service.proto