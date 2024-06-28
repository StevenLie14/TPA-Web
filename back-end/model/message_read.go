package model

import (
	"back-end/data/response"
	"time"
)

type MessageRead struct {
	MessageReadId string                   `json:"messageReadAtId" gorm:"primaryKey"`
	MessageId     string                   `json:"messageId"`
	UserId        string                   `json:"UserId"`
	ReadAt        time.Time                `json:"readAt"`
	User          response.UserResponse    `json:"user" gorm:"foreignKey:UserId;references:UserId"`
	Message       response.MessageResponse `json:"message" gorm:"foreignKey:MessageId;references:MessageId"`
}
