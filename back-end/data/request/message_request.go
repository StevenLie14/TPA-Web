package request

type MessageRequest struct {
	Message  string `json:"Message"`
	SenderId string `json:"senderId"`
	RoomId   string `json:"RoomId"`
}
