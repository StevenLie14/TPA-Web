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

type ArtistServiceImpl struct {
	ArtistRepository repository.ArtistRepository
	UserRepository   repository.UserRepository
	Validate         *validator.Validate
}

func NewArtistServiceImpl(ArtistRepository repository.ArtistRepository, UserRepository repository.UserRepository, Validate *validator.Validate) *ArtistServiceImpl {
	return &ArtistServiceImpl{ArtistRepository: ArtistRepository, UserRepository: UserRepository, Validate: Validate}
}

func (service *ArtistServiceImpl) GetArtistByUserId(userId string) (res response.ArtistResponse, err error) {
	artist, err := service.ArtistRepository.GetArtistByUserId(userId, true)
	if err != nil {
		return res, err
	}
	res = response.ArtistResponse{
		ArtistId:    artist.ArtistId,
		UserId:      artist.UserId,
		Description: artist.Description,
		Banner:      artist.Banner,
		VerifiedAt:  artist.VerifiedAt,
		User:        artist.User,
	}
	return res, nil
}

func (service *ArtistServiceImpl) GetArtistByArtistId(artistId string) (res response.ArtistResponse, err error) {
	artist, err := service.ArtistRepository.GetArtistByArtistId(artistId, true)
	if err != nil {
		return res, err
	}
	res = response.ArtistResponse{
		ArtistId:    artist.ArtistId,
		UserId:      artist.UserId,
		Description: artist.Description,
		Banner:      artist.Banner,
		VerifiedAt:  artist.VerifiedAt,
		User:        artist.User,
	}
	return res, nil
}

func (service *ArtistServiceImpl) CreateArtist(artist request.ArtistRequest) error {
	err := service.Validate.Struct(artist)
	if err != nil {
		return err
	}
	artistModel := model.Artist{
		UserId:      artist.UserId,
		Description: artist.Description,
		Banner:      artist.Banner,
		VerifiedAt:  nil,
		ArtistId:    utils.GenerateUUID(),
	}

	err = service.ArtistRepository.CreateArtist(artistModel)
	if err != nil {
		return err
	}
	return nil
}

func (service *ArtistServiceImpl) GetUnverifiedArtistByArtistId(artistId string) (res response.ArtistResponse, err error) {
	artist, err := service.ArtistRepository.GetArtistByArtistId(artistId, false)
	if err != nil {
		return res, err
	}
	res = response.ArtistResponse{
		ArtistId:    artist.ArtistId,
		UserId:      artist.UserId,
		Description: artist.Description,
		Banner:      artist.Banner,
		VerifiedAt:  artist.VerifiedAt,
		User:        artist.User,
	}
	return res, nil

}

func (service *ArtistServiceImpl) UpdateVerifyArtist(artistId string) error {
	artist, err := service.ArtistRepository.GetArtistByArtistId(artistId, false)
	if err != nil {
		return err
	}
	err = service.UserRepository.UpdateRole(artist.UserId)
	if err != nil {
		return err
	}
	now := time.Now()
	err = service.ArtistRepository.UpdateVerifyArtist(artistId, now)
	if err != nil {
		return err
	}
	return nil
}

func (service *ArtistServiceImpl) GetUnverifiedArtist() (res []response.ArtistResponse, err error) {
	artists, err := service.ArtistRepository.GetUnverifiedArtist()
	if err != nil {
		return res, err
	}
	for _, artist := range artists {
		res = append(res, response.ArtistResponse{
			ArtistId:    artist.ArtistId,
			UserId:      artist.UserId,
			Description: artist.Description,
			Banner:      artist.Banner,
			VerifiedAt:  artist.VerifiedAt,
			User:        artist.User,
		})
	}
	return res, nil
}

func (service *ArtistServiceImpl) DeleteArtist(artistId string) error {
	err := service.ArtistRepository.DeleteArtist(artistId)
	if err != nil {
		return err
	}
	return nil
}
