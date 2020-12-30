package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/chatpage"
)

func main() {
	fmt.Println("hello")
	handler := chatpage.ChatServer{
		Name: "SOME server",
	}
	http.HandleFunc("/", handler.Handle)
	log.Println("Starting server on http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
