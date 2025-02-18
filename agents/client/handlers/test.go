package handlers

import (
	"log"

	"github.com/bwmarrin/discordgo"
	"github.com/hcp-uw/doom-scrollers/agents/agent-client/grpc/client"
)

func Test(service *client.GRPCService, s *discordgo.Session, i *discordgo.InteractionCreate) {
	log.Print("Processing command `Test`...")

	options := i.ApplicationCommandData().Options
	optionMap := make(map[string]*discordgo.ApplicationCommandInteractionDataOption, len(options))
	for _, opt := range options {
		optionMap[opt.Name] = opt
	}
	deferredResponseError := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseDeferredChannelMessageWithSource,
	})

	if deferredResponseError != nil {
		log.Fatalf("Failed to process `Test` command: %v", deferredResponseError)
		return
	}	

	log.Println(optionMap["target"].StringValue())

	response, grpcCallError := service.SendMethodForTesting(optionMap["target"].StringValue())

	log.Println("Returned");

	if grpcCallError != nil {
		log.Fatal(grpcCallError)
		return
	}

	log.Println("About to create follow up message")

	_, followUpMessageError := s.FollowupMessageCreate(i.Interaction, true, &discordgo.WebhookParams{
		Content: response,
	})

	log.Println(followUpMessageError);

	if followUpMessageError != nil {
		return
	}

	log.Print("Processed command `Test`.")
}
