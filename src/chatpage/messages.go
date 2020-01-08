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
