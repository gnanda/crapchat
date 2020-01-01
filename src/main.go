package main

import (
	"net/http"

	"github.com/gnanda/crapchat/chatpage"
	"golang.org/x/net/websocket"
)

func main() {
	handler := chatpage.New() //ChatServer{}
	http.Handle("/", http.FileServer(http.Dir("src/chatpage/static")))
	http.HandleFunc("/send_message", handler.SendMessage)
	http.HandleFunc("/messages", websocket.Handler(handler.GetMessages))
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
