package repository

import (
	"back-end/database"
	"back-end/model"
	"gorm.io/gorm"
)

type PlaylistRepositoryImpl struct {
	DB  *gorm.DB
	rdb *database.Redis
}

func NewPlaylistRepositoryImpl(DB *gorm.DB, rdb *database.Redis) *PlaylistRepositoryImpl {
	return &PlaylistRepositoryImpl{DB: DB, rdb: rdb}
}

func (p PlaylistRepositoryImpl) GetAll() (res []model.Playlist, err error) {
	//TODO implement me
	panic("implement me")
}

func (p PlaylistRepositoryImpl) GetByUserID(id string) (res []model.Playlist, err error) {
	err = p.DB.Where("user_id", id).Preload("User").Preload("PlaylistDetails").Preload("PlaylistDetails.Song").Preload("PlaylistDetails.Song.User").Preload("PlaylistDetails.Song.Album").Find(&res).Error
	return
}

func (p PlaylistRepositoryImpl) GetPlaylistByID(id string) (res model.Playlist, err error) {
	err = p.DB.Where("playlist_id", id).Preload("User").Preload("PlaylistDetails").Preload("PlaylistDetails.Song").Preload("PlaylistDetails.Song.User").Preload("PlaylistDetails.Song.Album").Find(&res).Error
	return
}
