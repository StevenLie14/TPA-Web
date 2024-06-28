package model

import "back-end/data/response"

type Message struct {
	MessageId     string                         `json:"messageId" gorm:"primaryKey"`
	Message       string                         `json:"Message"`
	SenderId      string                         `json:"senderId"`
	RoomId        string                         `json:"RoomId"`
	SentBy        response.UserResponse          `json:"sentBy" gorm:"foreignKey:SenderId;references:UserId"`
	Room          response.RoomResponse          `json:"rooms" gorm:"foreignKey:RoomId;references:RoomId"`
	MessageReadAt []response.MessageReadResponse `json:"messageReadAt" gorm:"foreignKey:MessageId;references:MessageId"`
}
