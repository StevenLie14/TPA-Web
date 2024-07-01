package services

import (
	"back-end/data/response"
	"back-end/model"
	"back-end/repository"
	"github.com/go-playground/validator/v10"
	"sort"
)

type SongServiceImpl struct {
	SongRepository repository.SongRepository
	Validate       *validator.Validate
}

func NewSongServiceImpl(SongRepository repository.SongRepository, Validate *validator.Validate) *SongServiceImpl {
	return &SongServiceImpl{SongRepository: SongRepository, Validate: Validate}
}

func (s SongServiceImpl) GetAllSong() (res []response.SongResponse, err error) {
	resp, err := s.SongRepository.GetAllSong()
	for _, v := range resp {
		res = append(res, response.SongResponse{
			SongId:      v.SongId,
			Title:       v.Title,
			Album:       v.Album,
			AlbumId:     v.AlbumId,
			Genre:       v.Genre,
			ReleaseDate: v.ReleaseDate,
			Duration:    v.Duration,
			File:        v.File,
			Play:        v.Play,
			Image:       v.Image,
			ArtistId:    v.ArtistId,
			Artist:      v.Artist,
		})
	}
	return
}

func (s SongServiceImpl) GetSongById(id string) (res response.SongResponse, err error) {
	resp, err := s.SongRepository.GetSongById(id)
	if err != nil {
		return
	}
	res = response.SongResponse{
		SongId:      resp.SongId,
		Title:       resp.Title,
		Album:       resp.Album,
		AlbumId:     resp.AlbumId,
		Genre:       resp.Genre,
		ReleaseDate: resp.ReleaseDate,
		Duration:    resp.Duration,
		File:        resp.File,
		Play:        resp.Play,
		Image:       resp.Image,
		ArtistId:    resp.ArtistId,
		Artist:      resp.Artist,
	}
	return

}

func (s SongServiceImpl) GetSongByArtist(artistId string) (res []response.SongResponse, err error) {
	resp, err := s.SongRepository.GetSongByArtist(artistId)

	sort.Sort(sort.Reverse(model.ByPlayCount(resp)))

	for _, v := range resp {
		res = append(res, response.SongResponse{
			SongId:      v.SongId,
			Title:       v.Title,
			Album:       v.Album,
			AlbumId:     v.AlbumId,
			Genre:       v.Genre,
			ReleaseDate: v.ReleaseDate,
			Duration:    v.Duration,
			File:        v.File,
			Play:        v.Play,
			Image:       v.Image,
			ArtistId:    v.ArtistId,
			Artist:      v.Artist,
		})
	}
	return
}

func (s SongServiceImpl) GetSongByAlbum(albumId string) (res []response.SongResponse, err error) {
	resp, err := s.SongRepository.GetSongByAlbum(albumId)
	for _, v := range resp {
		res = append(res, response.SongResponse{
			SongId:      v.SongId,
			Title:       v.Title,
			Album:       v.Album,
			AlbumId:     v.AlbumId,
			Genre:       v.Genre,
			ReleaseDate: v.ReleaseDate,
			Duration:    v.Duration,
			File:        v.File,
			Play:        v.Play,
			Image:       v.Image,
			ArtistId:    v.ArtistId,
			Artist:      v.Artist,
		})
	}
	return
}
