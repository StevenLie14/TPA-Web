package response

import "time"

type SongResponse struct {
	SongId      string         `json:"songId"`
	Title       string         `json:"title"`
	UserId      string         `json:"userId"`
	AlbumId     string         `json:"albumId"`
	Genre       string         `json:"genre"`
	ReleaseDate time.Time      `json:"releaseDate"`
	Duration    int            `json:"duration"`
	File        string         `json:"file"`
	Image       string         `json:"image"`
	Album       AlbumResponse  `json:"album" gorm:"foreignKey:AlbumId;references:AlbumId"`
	Play        []PlayResponse `json:"play" gorm:"foreignKey:SongId;references:SongId"`
	User        UserResponse   `json:"user" gorm:"foreignKey:UserId;references:UserId"`
}

func (SongResponse) TableName() string {
	return "songs"
}
