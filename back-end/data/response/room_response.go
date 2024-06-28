package response

type RoomResponse struct {
	RoomId      string               `json:"roomId" form:"roomId" gorm:"primaryKey"`
	RoomName    string               `json:"roomName" form:"roomName"`
	Messages    []MessageResponse    `json:"messages" gorm:"foreignKey:RoomId;references:RoomId"`
	RoomDetails []RoomDetailResponse `json:"roomDetails" gorm:"foreignKey:RoomId;references:RoomId"`
}

func (RoomResponse) TableName() string {
	return "rooms"
}
