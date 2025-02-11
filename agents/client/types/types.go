package types

import (
	"github.com/bwmarrin/discordgo"
	"github.com/hcp-uw/doom-scrollers/agents/agent-client/grpc/client"
)

type CommandWithClient func(service *client.GRPCService, session *discordgo.Session, interaction *discordgo.InteractionCreate)
