package chatpage

import (
	//	"io"
	//"fmt"
	"log"
	//"net/http"
	//"strings"

	"golang.org/x/net/websocket"
)

type ChatServer struct {
	ws websocket.Server
}

type Message struct {
	MessageType string `json:"type"`
	Content     string `json:"content"`
}

func New() ChatServer {
	s := ChatServer{}
	return s
}

func (s *ChatServer) HandleMessages(c *websocket.Conn) {
	var data Message
	err := websocket.JSON.Receive(c, &data)
	if err != nil {
		log.Printf("Failed to read message: %s", err)
		return
	}
	log.Printf("Got message: %+v", data)
	response := Message{
		MessageType: "ACK",
		Content:     data.Content,
	}
	err = websocket.JSON.Send(c, response)
	if err != nil {
		log.Fatalf("Failed to send response: %s", err)
		return
	}

	// var tmp string
	// fmt.Scan(c, &s)
	// log.Printf("Read string %s", tmp)
	// fmt.Fprint(c, "Okay")
	// if c == nil {
	// 	log.Fatalf("c is nil!!!")
	// }
	// tmp := make([]byte, 1024)
	// n, err := c.Read(tmp)
	// if err != nil {
	// 	log.Fatalf("Invalid data: %s", err)
	// }
	// log.Printf("Read %d bytes as %s\n", n, tmp)
	// n, err = c.Write([]byte("OOOOO"))
	// if err != nil {
	// 	log.Fatalf("Failed to write data %s", err)
	// }
}
