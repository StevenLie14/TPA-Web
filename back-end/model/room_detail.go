package model

import "back-end/data/response"

type RoomDetail struct {
	RoomDetailID string                `json:"roomDetailId" gorm:"primaryKey"`
	UserID       string                `json:"userId" form:"userId"`
	RoomId       string                `json:"roomId" form:"roomId"`
	Room         response.RoomResponse `json:"room" gorm:"foreignKey:RoomId;references:RoomId"`
	UserJoin     response.UserResponse `json:"userJoin" gorm:"foreignKey:UserID;references:UserId"`
}
