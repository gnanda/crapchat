package message_handler

import (
	// "log"

	"github.com/gnanda/crapchat/messages"
)

type RequestHandler struct {
	messageRouter *message_router.MessageRouter
}

func New() *RequestHandler {
	return &RequestHandler {

	}
}

func (mh *RequestHandler) HandleRequest(message messages.Request) (*messages.Response, error) {

	return nil, nil
}
