package main

import (
	"fmt"
	"github.com/bwmarrin/discordgo"
	"github.com/joho/godotenv"
	"log"
	"os"
	"os/signal"
	"strings"
)

func main() {

	godotenv.Load()
	discord, err := discordgo.New("Bot " + os.Getenv("DISCORD_BOT_AUTH_TOKEN"))

	if err != nil {
		log.Println("Error creating Discord session: ", err)
	}

	discord.AddHandler(func(session *discordgo.Session, ready *discordgo.Ready) {

		for _, guild := range ready.Guilds {
			fmt.Println(guild.ID)
		}

		log.Println("Bot is running!")
	})

	discord.AddHandler(func(s *discordgo.Session, m *discordgo.MessageCreate) {

		if err != nil {
			log.Println("Error getting guild owner ID: ", err)
		}

		if strings.Contains(m.Content, "!help") {
			fmt.Println("Help command received | Guild ID: ", m.GuildID)
			s.ChannelMessageSend(m.ChannelID, "Hello, I'm a bot!")
		}
	})

	discord.AddHandler(func(s *discordgo.Session, g *discordgo.GuildCreate) {
		log.Println("Joined a new guild", g.Guild.ID, " Owner ID: ", g.Guild.OwnerID)
	})

	discord.AddHandler(func(s *discordgo.Session, g *discordgo.GuildDelete) {
		log.Println("Left a guild", g.Guild.ID)
	})


	err = discord.Open()
	if err != nil {
		log.Fatalf("Cannot open the session: %v", err)
	}
	defer discord.Close()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	<-stop
	log.Println("Graceful shutdown")
}
