package model

import "back-end/data/response"

type Rooms struct {
	RoomId      string                        `json:"roomId" form:"roomId" gorm:"primaryKey"`
	RoomName    string                        `json:"roomName" form:"roomName"`
	Messages    []response.MessageResponse    `json:"messages" gorm:"foreignKey:RoomId;references:RoomId"`
	RoomDetails []response.RoomDetailResponse `json:"roomDetails" gorm:"foreignKey:RoomId;references:RoomId"`
}
