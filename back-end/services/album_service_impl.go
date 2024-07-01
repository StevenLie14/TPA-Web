package services

import (
	"back-end/data/response"
	"back-end/repository"
	"github.com/go-playground/validator/v10"
)

type AlbumServiceImpl struct {
	AlbumRepository repository.AlbumRepository
	Validate        *validator.Validate
}

func NewAlbumServiceImpl(AlbumRepository repository.AlbumRepository, Validate *validator.Validate) *AlbumServiceImpl {
	return &AlbumServiceImpl{AlbumRepository: AlbumRepository, Validate: Validate}

}

func (a AlbumServiceImpl) GetAlbumsByTitle(title string) (res []response.AlbumResponse, err error) {
	resp, err := a.AlbumRepository.GetAlbumsByTitle(title)
	if err != nil {
		return nil, err
	}
	for _, album := range resp {
		res = append(res, response.AlbumResponse{
			AlbumId:  album.AlbumId,
			Title:    album.Title,
			Type:     album.Type,
			Banner:   album.Banner,
			Release:  album.Release,
			Artist:   album.Artist,
			ArtistId: album.ArtistId,
		})
	}
	return res, nil
}

func (a AlbumServiceImpl) GetAlbumsByArtist(artistId string) (res []response.AlbumResponse, err error) {
	resp, err := a.AlbumRepository.GetAlbumsByArtist(artistId)
	if err != nil {
		return nil, err
	}
	for _, album := range resp {
		res = append(res, response.AlbumResponse{
			AlbumId:  album.AlbumId,
			Title:    album.Title,
			Type:     album.Type,
			Banner:   album.Banner,
			Release:  album.Release,
			Artist:   album.Artist,
			ArtistId: album.ArtistId,
		})
	}
	return res, nil
}

func (a AlbumServiceImpl) GetRandomAlbum() (res []response.AlbumResponse, err error) {
	resp, err := a.AlbumRepository.GetRandomAlbum()
	if err != nil {
		return nil, err
	}
	for _, album := range resp {
		res = append(res, response.AlbumResponse{
			AlbumId:  album.AlbumId,
			Title:    album.Title,
			Type:     album.Type,
			Banner:   album.Banner,
			Release:  album.Release,
			Artist:   album.Artist,
			ArtistId: album.ArtistId,
		})
	}
	return res, nil
}
