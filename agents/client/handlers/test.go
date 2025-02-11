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

	response, grpcCallError := service.SendMethodForTesting(optionMap["target"].StringValue(), optionMap["prompt"].StringValue())
	if grpcCallError != nil {
		log.Fatal(grpcCallError)
		return
	}

	embed := &discordgo.MessageEmbed{
		Title:       response,
		Description: response,
		Color:       0x0000ff,
	}

	err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Embeds: []*discordgo.MessageEmbed{embed},
		},
	})

	if err != nil {
		log.Fatalf("Failed to process `Test` command: %v", err)
		return
	}

	log.Print("Processed command `Test`.")
}
