package connection_manager

import (
	// "log"

	"golang.org/x/net/websocket"
)

type ConnectionManager struct {
  //clients map[*websocket.Conn]bool
  clients map[string]map[*websocket.Conn]bool
}

func New() *ConnectionManager {
	return &ConnectionManager{
		clients: make(map[string]map[*websocket.Conn]bool),
	}
}

func (cm *ConnectionManager) GetMessageFromUser() {

}

func (cm *ConnectionManager) SendMessageToUser() {

}

func (cm *ConnectionManager) AddConnection(user string, c *websocket.Conn) {
	_, ok := cm.clients[user]
	if !ok {
		cm.clients[user] = make(map[*websocket.Conn]bool)
	}
	cm.clients[user][c] = true
}

func (cm *ConnectionManager) RemoveConnection(user string, c *websocket.Conn) {
	delete(cm.clients[user], c)
	if len(cm.clients[user]) == 0 {
		delete(cm.clients, user)
	}
}
