package websockets

type Room struct {
	Id       string             `json:"Id"`
	RoomName string             `json:"room_name"`
	Clients  map[string]*Client `json:"clients"`
}
