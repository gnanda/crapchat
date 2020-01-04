package chatpage

import (
	"io"
	"log"
	"net/http"
	"strings"

	"golang.org/x/net/websocket"
)

type ChatServer struct {
	ws websocket.Server
}

func New() ChatServer {
	s := ChatServer{}
	return s
}

func (s *ChatServer) SendMessage(w http.ResponseWriter, r *http.Request) {
	log.Printf("some words here %s\n", strings.ToLower(r.UserAgent()))
	w.Write([]byte("TESTING"))
}

func (s *ChatServer) GetMessages(c *websocket.Conn) {
	log.Printf("some words here %s\n", strings.ToLower(c.Request().UserAgent()))
	io.Copy(c, c)
}
