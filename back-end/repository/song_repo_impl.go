package repository

import (
	"back-end/database"
	"back-end/model"
	"fmt"
	"gorm.io/gorm"
)

type SongRepositoryImpl struct {
	DB  *gorm.DB
	rdb *database.Redis
}

func NewSongRepositoryImpl(DB *gorm.DB, rdb *database.Redis) *SongRepositoryImpl {
	return &SongRepositoryImpl{DB: DB, rdb: rdb}
}

func (s SongRepositoryImpl) GetAllSong() (res []model.Song, err error) {
	err = s.DB.Find(&res).Error
	return
}

func (s SongRepositoryImpl) GetSongById(id string) (res model.Song, err error) {
	fmt.Println("GetSongById", id)
	err = s.DB.Where("song_id = ?", id).Preload("Artist").Preload("Play").Preload("Album").Find(&res).Error
	return
}

func (s SongRepositoryImpl) FindSongByTitle(title string) (res []model.Song, err error) {
	err = s.DB.Where("title = ?", title).Find(&res).Error
	return
}

func (s SongRepositoryImpl) GetSongByArtist(artistId string) (res []model.Song, err error) {
	err = s.DB.Where("user_id = ?", artistId).Preload("Artist").Preload("Play").Preload("Album").Find(&res).Error
	return
}

func (s SongRepositoryImpl) GetSongByAlbum(albumId string) (res []model.Song, err error) {
	err = s.DB.Where("album_id = ?", albumId).Preload("Artist").Preload("Play").Preload("Album").Find(&res).Error
	return
}
