package response

type RoomDetailResponse struct {
	RoomDetailId string       `json:"roomDetailId" form:"roomDetailId"`
	UserID       string       `json:"userId" form:"userId"`
	RoomId       string       `json:"roomId" form:"roomId"`
	User         UserResponse `json:"user" gorm:"foreignKey:UserID;references:UserId"`
}

func (RoomDetailResponse) TableName() string {
	return "room_details"
}
