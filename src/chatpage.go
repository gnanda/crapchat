package chatpage

import (
	"net/http"
	"strings"
)

type ChatServer struct {
	Name string
}

func (s *ChatServer) Handle(w http.ResponseWriter, r *http.Request) {
	message := s.GetMessage(r.URL.Path)
	w.Write([]byte(message))
}

func (s *ChatServer) GetMessage(urlPath string) string {
	message := strings.TrimPrefix(urlPath, "/")
	message = "Hello " + message + " from " + s.Name
	return message
}
