package main

import (
	"fmt"
	"net/http"

	"github.com/chatpage"
)

func main() {
	fmt.Println("hello")
	handler := chatpage.ChatServer{
		Name: "SOME server",
	}
	http.HandleFunc("/", handler.Handle)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
