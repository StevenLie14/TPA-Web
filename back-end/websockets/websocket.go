package websockets

import (
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var upgrade = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func AllowUpgrade(ctx *gin.Context) {
	conn, err := upgrade.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer func(conn *websocket.Conn) {
		err := conn.Close()
		if err != nil {

		}
	}(conn)
}

func (p *Pool) Chat(ctx *gin.Context) {
	conn, err := upgrade.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		log.Println(err)
		return
	}

	roomId := ctx.Query("roomId")
	roomName := ctx.Query("roomName")
	clientId := ctx.Query("clientId")
	name := ctx.Query("name")

	client := &Client{
		Conn:     conn,
		Message:  make(chan *Message),
		Id:       clientId,
		Username: name,
		RoomId:   roomId,
		RoomName: roomName,
	}

	p.Register <- client

	go client.Write()
	client.Read(p)

}
