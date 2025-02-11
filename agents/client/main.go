package main

import (
	"flag"
	"github.com/hcp-uw/doom-scrollers/agents/agent-client/grpc/client"
	"github.com/hcp-uw/doom-scrollers/agents/agent-client/types"
	"log"
	"os"
	"os/signal"

	"github.com/bwmarrin/discordgo"
	"github.com/hcp-uw/doom-scrollers/agents/agent-client/handlers"
)

var (
	GuildID        = flag.String("guild", "", "Test guild ID. If not passed - bot registers commands globally")
	BotToken       = flag.String("token", "", "Bot access token")
	RemoveCommands = flag.Bool("rmcmd", true, "Remove all commands after shutting down or not")
)

var s *discordgo.Session
var gRPCService *client.GRPCService

func init() {
	flag.Parse()
	var botInstantiationError error
	s, botInstantiationError = discordgo.New("Bot " + *BotToken)
	if botInstantiationError != nil {
		log.Fatal(botInstantiationError)
	}

	var gRPCInitializationError error
	gRPCService, gRPCInitializationError = client.NewGRPCService("[::]:8089")

	if gRPCInitializationError != nil {
		log.Fatal(gRPCInitializationError)
	}
}

var (
	commands = []*discordgo.ApplicationCommand{
		{
			Name:        "hello",
			Description: "hello",
		},
		{
			Name:        "test",
			Description: "Test the functionality of a file",
			Options: []*discordgo.ApplicationCommandOption{
				{
					Type:        discordgo.ApplicationCommandOptionString,
					Name:        "target",
					Description: "File Descriptor",
					Required:    true,
				},
				{
					Type:        discordgo.ApplicationCommandOptionString,
					Name:        "prompt",
					Description: "Prompt",
					Required:    true,
				},
			},
		},
	}

	commandHandlers = map[string]types.CommandWithClient{
		"hello": handlers.Hello,
		"test":  handlers.Test,
	}
)

func init() {
	s.AddHandler(func(s *discordgo.Session, i *discordgo.InteractionCreate) {
		if h, ok := commandHandlers[i.ApplicationCommandData().Name]; ok {
			h(gRPCService, s, i)
		}
	})
}

func main() {
	s.AddHandler(func(s *discordgo.Session, r *discordgo.Ready) {
		log.Printf("Logged in as: %v#%v", s.State.User.Username, s.State.User.Discriminator)
	})
	err := s.Open()
	if err != nil {
		log.Fatalf("Cannot open the session: %v", err)
	}

	log.Println("Adding commands...")
	registeredCommands := make([]*discordgo.ApplicationCommand, len(commands))
	for i, v := range commands {
		cmd, err := s.ApplicationCommandCreate(s.State.User.ID, *GuildID, v)
		if err != nil {
			log.Panicf("Cannot create '%v' command: %v", v.Name, err)
		}
		registeredCommands[i] = cmd
	}

	defer func(s *discordgo.Session) {
		err := s.Close()
		if err != nil {
			log.Fatalf("Cannot close session: %v", err)
		}
	}(s)

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	log.Println("Press Ctrl+C to exit")
	<-stop

	if *RemoveCommands {
		log.Println("Removing commands...")
		for _, v := range registeredCommands {
			err := s.ApplicationCommandDelete(s.State.User.ID, *GuildID, v.ID)
			if err != nil {
				log.Panicf("Cannot delete '%v' command: %v", v.Name, err)
			}
		}
	}

	log.Println("Gracefully shutting down.")
}
