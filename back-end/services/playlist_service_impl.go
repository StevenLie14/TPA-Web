package services

import (
	"back-end/data/request"
	"back-end/data/response"
	"back-end/model"
	"back-end/repository"
	"back-end/utils"
	"github.com/go-playground/validator/v10"
	"time"
)

type PlaylistServiceImpl struct {
	PlayListRepo repository.PlaylistRepository
	Validate     *validator.Validate
}

func NewPlaylistServiceImpl(PlayListRepo repository.PlaylistRepository, Validate *validator.Validate) *PlaylistServiceImpl {
	return &PlaylistServiceImpl{PlayListRepo: PlayListRepo, Validate: Validate}
}

func (p PlaylistServiceImpl) GetAll() (res []response.PlayListResponse, err error) {
	result, err := p.PlayListRepo.GetAll()
	if err != nil {
		return
	}
	for _, playlist := range result {
		res = append(res, response.PlayListResponse{
			PlaylistId:      playlist.PlaylistId,
			Title:           playlist.Title,
			User:            playlist.User,
			UserId:          playlist.UserId,
			Image:           playlist.Image,
			Description:     playlist.Description,
			PlaylistDetails: playlist.PlaylistDetails,
		})
	}
	return
}

func (p PlaylistServiceImpl) GetByUserID(id string) (res []response.PlayListResponse, err error) {
	result, err := p.PlayListRepo.GetByUserID(id)
	if err != nil {
		return
	}
	for _, playlist := range result {
		res = append(res, response.PlayListResponse{
			PlaylistId:      playlist.PlaylistId,
			Title:           playlist.Title,
			User:            playlist.User,
			UserId:          playlist.UserId,
			Image:           playlist.Image,
			Description:     playlist.Description,
			PlaylistDetails: playlist.PlaylistDetails,
		})
	}
	return
}

func (p PlaylistServiceImpl) GetPlaylistByID(id string) (res response.PlayListResponse, err error) {

	result, err := p.PlayListRepo.GetPlaylistByID(id)
	if err != nil {
		return
	}
	res = response.PlayListResponse{
		PlaylistId:      result.PlaylistId,
		Title:           result.Title,
		User:            result.User,
		UserId:          result.UserId,
		Image:           result.Image,
		Description:     result.Description,
		PlaylistDetails: result.PlaylistDetails,
	}
	return
}

func (p PlaylistServiceImpl) Create(playlist request.PlayListRequest) error {
	err := p.Validate.Struct(playlist)
	if err != nil {
		return err
	}
	play := model.Playlist{
		Title:       playlist.Title,
		UserId:      playlist.UserID,
		Image:       playlist.Image,
		Description: playlist.Description,
		PlaylistId:  utils.GenerateUUID(),
	}
	err = p.PlayListRepo.Create(play)
	return err
}

func (p PlaylistServiceImpl) CreateDetail(playlistDetail request.PlayListDetailRequest) error {
	err := p.Validate.Struct(playlistDetail)
	if err != nil {
		return err
	}
	playDetail := model.PlaylistDetails{
		DateAdded:        time.Now(),
		PlaylistDetailId: utils.GenerateUUID(),
		PlaylistId:       playlistDetail.PlaylistID,
		SongId:           playlistDetail.SongID,
	}
	err = p.PlayListRepo.CreateDetail(playDetail)
	return err
}

func (p PlaylistServiceImpl) DeletePlaylistDetailByID(id string) error {
	err := p.PlayListRepo.DeletePlaylistDetailByID(id)
	return err
}

func (p PlaylistServiceImpl) DeletePlaylistByID(id string) error {
	err := p.PlayListRepo.DeletePlaylistByID(id)
	return err
}
