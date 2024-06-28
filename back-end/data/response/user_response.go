package response

type UserResponse struct {
	UserId   string `json:"user_id"`
	Username string `json:"username"`
	Email    string `json:"email" `
	Role     string `json:"role"`
}

func (UserResponse) TableName() string {
	return "users"
}
