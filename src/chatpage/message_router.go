package message_router

import (
	"github.com/gnanda/crapchat/messages"
)

type MessageRouter struct {
	messageQueue chan messages.Message
}

func New() *MessageRouter {
	return &MessageRouter{
		messageQueue: make(chan messages.Message),
	}
}

func (router *MessageRouter) GetMessages(user string) ( []messages.Message, error ) {
	return []messages.Message{}, nil
}
