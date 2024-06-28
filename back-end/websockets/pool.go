package websockets

import "fmt"

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Channels   map[string]*Room
	BroadCast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Channels:   make(map[string]*Room),
		BroadCast:  make(chan Message),
	}
}

func (p *Pool) Start() {
	for {
		select {
		case client := <-p.Register:
			//fmt.Println("Registering client", client.Id)
			if room := p.Channels[client.RoomId]; room == nil {
				p.Channels[client.RoomId] = &Room{
					Id:       client.RoomId,
					RoomName: client.RoomName,
					Clients:  make(map[string]*Client),
				}
			}

			room := p.Channels[client.RoomId]
			if _, exists := room.Clients[client.Id]; !exists {
				room.Clients[client.Id] = client
			}
			for _, c := range room.Clients {
				err := c.Conn.WriteJSON(Message{
					UserName: client.Username,
					Message:  client.Username + " has Joined...",
					UserId:   client.Id,
					RoomId:   client.RoomId,
				})
				if err != nil {
					fmt.Println("Error sending join message:", err)
					return
				}
			}

		case client := <-p.Unregister:
			if room := p.Channels[client.RoomId]; room != nil {
				if _, exists := p.Channels[client.RoomId].Clients[client.Id]; exists {

					//err := client.Conn.Close()
					//if err != nil {
					//	fmt.Println("Error closing connection:", err)
					//	return
					//}

					if len(p.Channels[client.RoomId].Clients) > 0 {
						for _, c := range room.Clients {
							if c.Id != client.Id {
								err := c.Conn.WriteJSON(Message{
									UserName: client.Username,
									Message:  client.Username + " has Left...",
									UserId:   client.Id,
									RoomId:   client.RoomId,
								})
								if err != nil {
									fmt.Println("Error sending join message:", err)
									return
								}
							}

						}
					}
					delete(p.Channels[client.RoomId].Clients, client.Id)

					if len(p.Channels[client.RoomId].Clients) == 0 {
						delete(p.Channels, client.RoomId)
					}
				}
			}

		case message := <-p.BroadCast:
			fmt.Println("Broadcasting message from", message.UserName, ":", message.Message)
			if room := p.Channels[message.RoomId]; room != nil {
				for _, client := range room.Clients {
					err := client.Conn.WriteJSON(message)
					if err != nil {
						fmt.Println("Error broadcasting message to client", client.Id, ":", err)
					}
				}
			} else {
				fmt.Println("Room", message.RoomId, "does not exist.")
			}
		}
	}
}
