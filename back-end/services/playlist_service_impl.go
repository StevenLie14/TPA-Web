package services

import (
	"back-end/model"
	"back-end/repository"
	"github.com/go-playground/validator/v10"
)

type PlaylistServiceImpl struct {
	PlayListRepo repository.PlaylistRepository
	Validate     *validator.Validate
}

func NewPlaylistServiceImpl(PlayListRepo repository.PlaylistRepository, Validate *validator.Validate) *PlaylistServiceImpl {
	return &PlaylistServiceImpl{PlayListRepo: PlayListRepo, Validate: Validate}
}

func (p PlaylistServiceImpl) GetAll() (res []model.Playlist, err error) {
	res, err = p.PlayListRepo.GetAll()
	return
}

func (p PlaylistServiceImpl) GetByUserID(id string) (res []model.Playlist, err error) {
	res, err = p.PlayListRepo.GetByUserID(id)
	return
}

func (p PlaylistServiceImpl) GetPlaylistByID(id string) (res model.Playlist, err error) {
	res, err = p.PlayListRepo.GetPlaylistByID(id)
	return
}
