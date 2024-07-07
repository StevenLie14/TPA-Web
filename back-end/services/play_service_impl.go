package services

import (
	"back-end/data/response"
	"back-end/repository"
	"github.com/go-playground/validator/v10"
)

type PlayServiceImpl struct {
	PlayRepository repository.PlayRepository
	Validate       *validator.Validate
}

func NewPlayServiceImpl(PlayRepository repository.PlayRepository, Validate *validator.Validate) *PlayServiceImpl {
	return &PlayServiceImpl{PlayRepository: PlayRepository, Validate: Validate}
}

func (service PlayServiceImpl) Get8LastPlayedSongByUser(userId string) (res []response.PlayResponse, err error) {
	result, err := service.PlayRepository.GetLastPlayedSongByUser(userId)
	if err != nil {
		return nil, err
	}
	for _, play := range result {
		res = append(res, response.PlayResponse{
			PlayId: play.PlayId,
			SongId: play.SongId,
			UserId: play.UserId,
			Song:   play.Song,
			User:   play.User,
		})
	}
	return
}

func (service PlayServiceImpl) GetLastPlayedSongByUser(userId string) (res []response.PlayResponse, err error) {
	result, err := service.PlayRepository.GetLastPlayedSongByUser(userId)
	if err != nil {
		return nil, err
	}
	for _, play := range result {
		res = append(res, response.PlayResponse{
			PlayId: play.PlayId,
			SongId: play.SongId,
			UserId: play.UserId,
			Song:   play.Song,
			User:   play.User,
		})
	}
	return
}
