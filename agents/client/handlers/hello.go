package handlers

import (
	"github.com/hcp-uw/doom-scrollers/agents/agent-client/grpc/client"
	"log"

	"github.com/bwmarrin/discordgo"
)

func Hello(service *client.GRPCService, s *discordgo.Session, i *discordgo.InteractionCreate) {
	log.Print("Processing command hello...")

	embed := &discordgo.MessageEmbed{
		Title:       "Hello",
		Description: "Hello",
		Color:       0x00ff00,
	}

	err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Embeds: []*discordgo.MessageEmbed{embed},
		},
	})
	if err != nil {
		log.Fatalf("Failed to process `hello` command: %v", err)
		return
	}

	log.Print("Processed command hello.")
}
