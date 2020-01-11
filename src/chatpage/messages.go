package messages

import (
	// "log"
)

type Message struct {
	MessageType string `json:"message_type"`
	MessageId   string `json:"id"`
	Timestamp   int64  `json:"timestamp"`
	// ByteArrayContent
	Content string `json:"content"`
}

type Request struct {
	message Message
}

type Response struct {
	message Message
}

type ClientRequest struct {
	MessageType string `json:"message_type"`
	Content     string `json:"content"`
}

type ClientResponse struct {
	MessageType string `json:"message_type"`
	Content     string `json:"content"`
}


func ParseRequest(m ClientRequest) (Request, error) {

	return Request{}, nil
}

func EncodeResponse(r Response) (ClientResponse, error) {

	return ClientResponse{}, nil
}
