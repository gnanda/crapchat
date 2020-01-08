package chatpage

import (
	//	"io"
	//"fmt"
	"log"
	"math/rand"
	//"net/http"
	//"strings"
	"strconv"

	"github.com/gnanda/crapchat/connection_manager"
	"github.com/gnanda/crapchat/message_handler"
	"golang.org/x/net/websocket"
)

type ChatServer struct {
	connectionManager *connection_manager.ConnectionManager
	messageHandler    *message_handler.MessageHandler
	// clients map[*websocket.Conn]bool
	// messageQueue chan Message
}

type Message struct {
	MessageType string `json:"message_type"`
	Content     string `json:"content"`
}

func New() ChatServer {
	s := ChatServer{
		connectionManager: connection_manager.New(),
		messageHandler:    message_handler.New(),
	}
	return s
}

func (s *ChatServer) GetUser() string {
	return "someuser" + strconv.Itoa(rand.Int())
}

func (s *ChatServer) HandleConnections(c *websocket.Conn) {
	user := s.GetUser()
	s.connectionManager.AddConnection(user, c)
	defer s.connectionManager.RemoveConnection(user, c)
	for {
		var data Message
		err := websocket.JSON.Receive(c, &data)
		if err != nil {
			log.Printf("Failed to read message: %s", err)
			return
		}
		log.Printf("Got message: %+v", data)
		// Handle message here.  How do I add in the stuff to send messages down to client???
		response := Message{
			MessageType: "MESSAGE",
			Content:     "</textarea><script>alert('hi');<script>",
		}
		err = websocket.JSON.Send(c, response)
		if err != nil {
			log.Fatalf("Failed to send response: %s", err)
			return
		}
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
