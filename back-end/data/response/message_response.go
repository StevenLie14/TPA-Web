package response

type MessageResponse struct {
	MessageId     string                `json:"messageId"`
	Message       string                `json:"Message"`
	SenderId      string                `json:"senderId"`
	Sender        UserResponse          `json:"sender" gorm:"foreignKey:SenderId;references:UserId"`
	RoomId        string                `json:"RoomId"`
	MessageReadAt []MessageReadResponse `json:"messageReadAt" gorm:"foreignKey:MessageId;references:MessageId"`
}

func (MessageResponse) TableName() string {
	return "messages"
}
