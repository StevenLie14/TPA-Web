package services

import "back-end/model"

type PlaylistService interface {
	GetAll() (res []model.Playlist, err error)
	GetByUserID(id string) (res []model.Playlist, err error)
	GetPlaylistByID(id string) (res model.Playlist, err error)
}
