package websockets

type Message struct {
	UserName string `json:"UserName"`
	Message  string `json:"Message"`
	UserId   string `json:"UserId"`
	RoomId   string `json:"RoomId"`
}
