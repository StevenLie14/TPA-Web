package response

type UserResponse struct {
	UserId      string  `json:"user_id"`
	Username    string  `json:"username"`
	Email       string  `json:"email" `
	Role        string  `json:"role"`
	Avatar      *string `json:"avatar"`
	Country     *string `json:"country"`
	Gender      *string `json:"gender"`
	Description *string `json:"description"`
}

func (UserResponse) TableName() string {
	return "users"
}
