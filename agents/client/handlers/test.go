package handlers

import (
	"github.com/bwmarrin/discordgo"
	"github.com/hcp-uw/doom-scrollers/agents/agent-client/grpc/client"
	"log"
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
	response, grpcCallError := service.SendMethodForTesting(optionMap["target"].StringValue(), optionMap["prompt"].StringValue())
	if grpcCallError != nil {
		log.Fatal(grpcCallError)
		return
	}

	_, followUpMessageError := s.FollowupMessageCreate(i.Interaction, true, &discordgo.WebhookParams{
		Content: response,
	})
	if followUpMessageError != nil {
		return
	}

	log.Print("Processed command `Test`.")
}
