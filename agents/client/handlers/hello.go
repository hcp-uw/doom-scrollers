package handlers

import (
	"log"

	"github.com/bwmarrin/discordgo"
)

func Hello(s *discordgo.Session, i *discordgo.InteractionCreate) {
	log.Print("Processing command hello...")

	embed := &discordgo.MessageEmbed{
		Title: "Hello",
		Description: "Hello",
		Color: 0x00ff00,
	}

	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Embeds: []*discordgo.MessageEmbed{embed},
		},
	})

	log.Print("Processed command hello.")
}