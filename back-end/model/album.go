package model

import (
	"back-end/data/response"
	"time"
)

type Album struct {
	AlbumId string `gorm:"primaryKey"`
	UserId  string
	Title   string
	Type    string
	Banner  string
	Release time.Time
	User    response.UserResponse `gorm:"foreignKey:UserId;references:UserId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}
