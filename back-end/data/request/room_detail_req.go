package request

type RoomDetailRequest struct {
	UserID string `json:"userId" form:"userId"`
	RoomId string `json:"roomId" form:"roomId"`
}
