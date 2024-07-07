package repository

import "back-end/model"

type PlaylistRepository interface {
	Create(playlist model.Playlist) error
	CreateDetail(playlistDetail model.PlaylistDetails) error
	GetAll() (res []model.Playlist, err error)
	GetByUserID(id string) (res []model.Playlist, err error)
	GetPlaylistByID(id string) (res model.Playlist, err error)
	DeletePlaylistDetailByID(id string) error
	DeletePlaylistByID(id string) error
}
