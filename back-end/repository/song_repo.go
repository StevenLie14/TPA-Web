package repository

import "back-end/model"

type SongRepository interface {
	GetAllSong() (res []model.Song, err error)
	GetSongById(id string) (res model.Song, err error)
	FindSongByTitle(title string) (res []model.Song, err error)
	GetSongByArtist(artistId string) (res []model.Song, err error)
	GetSongByAlbum(albumId string) (res []model.Song, err error)
}
