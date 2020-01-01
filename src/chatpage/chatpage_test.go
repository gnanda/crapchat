package chatpage_test

import (
	"testing"

	"github.com/chatpage"
)

var server chatpage.ChatServer

func init() {
	server = chatpage.ChatServer{Name: "some_server"}
}

func TestHandle(t *testing.T) {
	var tests = []struct {
		path     string
		expected string
	}{
		{"", "Hello  from some_server"},
		{"myname", "Hello myname from some_server"},
	}
	for _, tt := range tests {
		actual := server.GetMessage(tt.path)
		if actual != tt.expected {
			t.Errorf("Failure. Expected %s actual %s", tt.expected, actual)
		}
	}

}
