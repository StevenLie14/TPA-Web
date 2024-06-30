package response

import "time"

type AlbumResponse struct {
	AlbumId string       `json:"albumId"`
	Title   string       `json:"title"`
	Type    string       `json:"type"`
	Banner  string       `json:"banner"`
	Release time.Time    `json:"release"`
	UserId  string       `json:"userId"`
	User    UserResponse `json:"user" gorm:"foreignKey:UserId;references:UserId"`
}

func (AlbumResponse) TableName() string {
	return "albums"
}
