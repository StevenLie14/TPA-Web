package services

import (
	"back-end/data/response"
	"back-end/repository"
)

type SearchServiceImpl struct {
	SongRepository  repository.SongRepository
	UserRepository  repository.UserRepository
	AlbumRepository repository.AlbumRepository
}

func NewSearchService(songRepository repository.SongRepository, userRepository repository.UserRepository, albumRepository repository.AlbumRepository) SearchService {
	return SearchServiceImpl{
		SongRepository:  songRepository,
		UserRepository:  userRepository,
		AlbumRepository: albumRepository,
	}
}

func (s SearchServiceImpl) Search(keyword string) ([]response.SearchResponse, error) {
	var res []response.SearchResponse

	//songs, err := s.SongRepository.FindSongByTitle(keyword)
	//if err != nil {
	//	return res, err
	//}
	//
	//albums, err := s.AlbumRepository.GetAlbumsByTitle(keyword)
	//if err != nil {
	//	return res, err
	//}
	//
	//users, err := s.UserRepository.FindArtistByName(keyword)
	//if err != nil {
	//	return res, err
	//}
	//
	//for _, song := range songs {
	//	res = append(res, response.SearchResponse{
	//		Payload: song,
	//		Type:    "song",
	//		Count:   song.,
	//	})
	//}

	return res, nil
}
