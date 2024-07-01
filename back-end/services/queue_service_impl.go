package services

import (
	"back-end/data/response"
	"back-end/model"
	"back-end/repository"
	"github.com/go-playground/validator/v10"
)

type QueueServiceImpl struct {
	QueueRepository repository.QueueRepository
	Validate        *validator.Validate
}

func NewQueueServiceImpl(QueueRepository repository.QueueRepository, Validate *validator.Validate) *QueueServiceImpl {
	return &QueueServiceImpl{QueueRepository: QueueRepository, Validate: Validate}

}

func (q QueueServiceImpl) ClearQueue() error {
	err := q.QueueRepository.ClearQueue()
	if err != nil {
		return err
	}
	return nil
}

func (q QueueServiceImpl) Enqueue(song model.Song) error {
	err := q.QueueRepository.Enqueue(song)
	if err != nil {
		return err
	}
	return nil
}

func (q QueueServiceImpl) Dequeue() (response.SongResponse, error) {
	song, err := q.QueueRepository.Dequeue()
	if err != nil {
		return response.SongResponse{}, err
	}
	res := response.SongResponse{
		SongId:      song.SongId,
		Title:       song.Title,
		ArtistId:    song.ArtistId,
		AlbumId:     song.AlbumId,
		Genre:       song.Genre,
		ReleaseDate: song.ReleaseDate,
		Duration:    song.Duration,
		File:        song.File,
		Image:       song.Image,
		Album:       song.Album,
		Play:        song.Play,
		Artist:      song.Artist,
	}

	return res, nil
}

func (q QueueServiceImpl) GetQueue() (response.SongResponse, error) {
	song, err := q.QueueRepository.GetQueue()
	if err != nil {
		return response.SongResponse{}, err
	}
	res := response.SongResponse{
		SongId:      song.SongId,
		Title:       song.Title,
		ArtistId:    song.ArtistId,
		AlbumId:     song.AlbumId,
		Genre:       song.Genre,
		ReleaseDate: song.ReleaseDate,
		Duration:    song.Duration,
		File:        song.File,
		Image:       song.Image,
		Album:       song.Album,
		Play:        song.Play,
		Artist:      song.Artist,
	}

	return res, nil
}

func (q QueueServiceImpl) GetAllQueue() ([]response.SongResponse, error) {
	songs, err := q.QueueRepository.GetAllQueue()
	if err != nil {
		return nil, err
	}
	var res []response.SongResponse
	for _, song := range songs {
		res = append(res, response.SongResponse{
			SongId:      song.SongId,
			Title:       song.Title,
			ArtistId:    song.ArtistId,
			AlbumId:     song.AlbumId,
			Genre:       song.Genre,
			ReleaseDate: song.ReleaseDate,
			Duration:    song.Duration,
			File:        song.File,
			Image:       song.Image,
			Album:       song.Album,
			Play:        song.Play,
			Artist:      song.Artist,
		})
	}

	return res, nil
}
