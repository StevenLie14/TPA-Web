package request

import (
	"back-end/data/response"
	"time"
)

type SongRequest struct {
	SongId      string                  `json:"songId" validate:"required"`
	Title       string                  `json:"title" validate:"required"`
	ArtistId    string                  `json:"artistId" validate:"required"`
	AlbumId     string                  `json:"albumId" validate:"required"`
	Genre       string                  `json:"genre" validate:"required"`
	ReleaseDate time.Time               `json:"releaseDate" validate:"required"`
	Duration    int                     `json:"duration" validate:"required"`
	File        string                  `json:"file" validate:"required"`
	Image       string                  `json:"image" validate:"required"`
	Play        []response.PlayResponse `json:"play" validate:"required"`
	Album       response.AlbumResponse  `json:"album" validate:"required"`
	Artist      response.ArtistResponse `json:"artist" validate:"required"`
}
