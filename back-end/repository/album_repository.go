package repository

import "back-end/model"

type AlbumRepository interface {
	GetAlbumsByTitle(title string) ([]model.Album, error)
	GetAlbumsByArtist(artistId string) ([]model.Album, error)
	GetRandomAlbum() ([]model.Album, error)
}
