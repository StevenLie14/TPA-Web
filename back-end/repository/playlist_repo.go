package repository

import "back-end/model"

type PlaylistRepository interface {
	GetAll() (res []model.Playlist, err error)
	GetByUserID(id string) (res []model.Playlist, err error)
	GetPlaylistByID(id string) (res model.Playlist, err error)
}
