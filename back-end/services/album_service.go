package services

import (
	"back-end/data/response"
)

type AlbumService interface {
	GetAlbumsByTitle(title string) (res []response.AlbumResponse, err error)
	GetAlbumsByArtist(artistId string) (res []response.AlbumResponse, err error)
	GetRandomAlbum() (res []response.AlbumResponse, err error)
}
