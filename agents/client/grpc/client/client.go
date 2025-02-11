package client

import (
	"context"
	agent_client "github.com/hcp-uw/doom-scrollers/agents/agent-client/agent_service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type GRPCService struct {
	grpcClient agent_client.TestAgentClient
}

func NewGRPCService(connectionString string) (*GRPCService, error) {
	conn, err := grpc.NewClient(connectionString, grpc.WithTransportCredentials(insecure.NewCredentials()))

	if err != nil {
		return nil, err
	}

	return &GRPCService{
		grpcClient: agent_client.NewTestAgentClient(conn),
	}, nil
}

func (s *GRPCService) SendMethodForTesting(fileName string, prompt string) (string, error) {
	response, err := s.grpcClient.TestMethod(context.Background(), &agent_client.TestMethodRequest{
		FileName: fileName,
		Prompt:   prompt,
	})

	if err != nil {
		return "Error calling `TestMethod` with gRPC", err
	}

	return response.String(), nil
}
