package request

type RoomRequest struct {
	RoomName string `json:"roomName" validate:"required"`
}
