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
	"github.com/gnanda/crapchat/request_handler"
	"github.com/gnanda/crapchat/message_router"
	"github.com/gnanda/crapchat/messages"
	"golang.org/x/net/websocket"
)

type ChatServer struct {
	connectionManager *connection_manager.ConnectionManager
	requestHandler    *request_handler.RequestHandler
	messageRouter *message_router.MessageRouter
	//incoming 
	// clients map[*websocket.Conn]bool
	// messageQueue chan Message
}

func New() ChatServer {
	s := ChatServer{
		connectionManager: connection_manager.New(),
		requestHandler:    request_handler.New(),
		messageRouter:	message_router.New(),
	}
	return s
}

func (s *ChatServer) GetUser() string {
	return "someuser" + strconv.Itoa(rand.Int())
}

func (s *ChatServer) receiveMessage(c *websocket.Conn, incomingMessages chan bool) {
		var data messages.ClientRequest
		err := websocket.JSON.Receive(c, &data)
		if err != nil {
			log.Printf("Failed to read message: %s", err)
			return
		}
		log.Printf("Got message: %+v", data)
		m, err := messages.ParseRequest(data)
		if err != nil {
			log.Printf("Failed to parse message: %s", err)
			return
		}
		resp, err := s.requestHandler.HandleRequest(m)
		if err != nil {
			log.Printf("Failed to handle message: %s", err)
			return
		}
		if resp != nil {
			clientResponse, err := messages.EncodeResponse(*resp)
			if err != nil {
				log.Printf("Failed to encode response: %s", err)
				return
			}
			err = websocket.JSON.Send(c, clientResponse)
			if err != nil {
				log.Fatalf("Failed to send response: %s", err)
				return
			}
		}
		incomingMessages <- true
}

func (s *ChatServer) HandleConnections(c *websocket.Conn) {
	user := s.GetUser()
	s.connectionManager.AddConnection(user, c)
	defer s.connectionManager.RemoveConnection(user, c)
	incomingMessages := make(chan bool)
	for {
		select {
		case <- incomingMessages:
			log.Printf("Handled a message")
		case response, err := <-s.messageRouter.GetMessages(user):
			if err != nil {
				log.Printf("Failed to get message: %s", err)
				return
			}
			clientResponse, err := messages.EncodeResponse(response)
			if err != nil {
				log.Printf("Failed to encode response: %s", err)
				return
			}
			err = websocket.JSON.Send(c, clientResponse)
			if err != nil {
				log.Fatalf("Failed to send response: %s", err)
				return
			}

		}

//
//		// Handle message here.  How do I add in the stuff to send messages down to client???
//		response := clientMessage{
//			MessageType: "MESSAGE",
//			Content:     "</textarea><script>alert('hi');<script>",
//		}
//		err = websocket.JSON.Send(c, response)
//		if err != nil {
//			log.Fatalf("Failed to send response: %s", err)
//			return
//		}
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
