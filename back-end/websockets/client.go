package websockets

import (
	"fmt"
	"github.com/gorilla/websocket"
	"strings"
)

type Client struct {
	Conn     *websocket.Conn
	Message  chan *Message
	Id       string `json:"id"`
	Username string `json:"username"`
	RoomId   string `json:"roomId"`
	RoomName string `json:"roomName"`
}

func (c *Client) Write() {
	defer func() {
		err := c.Conn.Close()
		if err != nil {
			return
		}
	}()

	for {
		message, ok := <-c.Message
		if !ok {
			return
		}
		err := c.Conn.WriteJSON(message)
		if err != nil {
			return
		}
	}

}

func (c *Client) Read(p *Pool) {
	defer func() {
		p.Unregister <- c
		err := c.Conn.Close()
		if err != nil {
			return
		}
	}()

	for {
		_, m, err := c.Conn.ReadMessage()
		if err != nil {
			fmt.Printf("Client %s error: %v\n", c.Id, err)
			if strings.Contains(err.Error(), "websocket: close") {
				fmt.Printf("Client %s close Connection\n", c.Id)
			}
			break
		}

		message := Message{
			UserName: c.Username,
			Message:  string(m),
			UserId:   c.Id,
			RoomId:   c.RoomId,
		}

		p.BroadCast <- message
	}

}
