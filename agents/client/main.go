package main

import (
	"context"
	"log"

	agent_client "github.com/hcp-uw/doom-scrollers/agents/agent-client/agent_service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	var conn *grpc.ClientConn

	conn, err := grpc.NewClient("[::]:8089", grpc.WithTransportCredentials(insecure.NewCredentials()));

	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}

	defer conn.Close()

	client := agent_client.NewTestAgentClient(conn);

	response, err := client.TestMethod(context.Background(), &agent_client.TestMethodRequest{
		FileName: "test.txt",
		Prompt: "Hello, World!",
	})

	if err != nil {
		log.Fatal("Unable to test method", err);
	}

	log.Printf("Response: %s", response)
	
}
