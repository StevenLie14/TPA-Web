package response

import "time"

type MessageReadResponse struct {
	MessageReadId string       `json:"messageReadAtId"`
	MessageId     string       `json:"messageId"`
	UserId        string       `json:"UserId"`
	User          UserResponse `json:"reader" gorm:"foreignKey:UserId;references:UserId"`
	ReadAt        time.Time    `json:"readAt"`
}

func (MessageReadResponse) TableName() string {
	return "message_reads"
}
