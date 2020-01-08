package main

import (
	"flag"
	"log"
	"net"
	"net/http"
	"strconv"
	"time"

	"github.com/gnanda/crapchat/chatpage"
	"golang.org/x/net/websocket"
)

var Host = flag.String("hostname", "", "Hostname to listen on")
var Port = flag.Int("port", 8080, "Port to listen on")

func main() {
	flag.Parse()

	handler := chatpage.New() //ChatServer{}
	http.Handle("/", http.FileServer(http.Dir("src/chatpage/static")))
	//http.HandleFunc("/send_message", handler.SendMessage)
	http.HandleFunc("/messages", websocket.Handler(handler.HandleConnections).ServeHTTP)

	ipaddr := net.JoinHostPort(*Host, strconv.Itoa(*Port))
	log.Printf("listening on %s", ipaddr)
	s := &http.Server{
		Addr:           ipaddr,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	log.Fatal(s.ListenAndServe())
}
