package message_handler

import (
	// "log"

	"github.com/gnanda/crapchat/messages"
)

type MessageHandler struct {
	messageQueue chan messages.Message
}

func New() *MessageHandler {
	return &MessageHandler {

	}
}
