package repository

import (
	"back-end/database"
	"back-end/model"
	"gorm.io/gorm"
)

type AlbumRepositoryImpl struct {
	DB  *gorm.DB
	rdb *database.Redis
}

func NewAlbumRepositoryImpl(DB *gorm.DB, rdb *database.Redis) *AlbumRepositoryImpl {
	return &AlbumRepositoryImpl{DB: DB, rdb: rdb}
}

func (a AlbumRepositoryImpl) GetAlbumsByTitle(title string) (res []model.Album, err error) {
	err = a.DB.Where("title = ?", "%"+title+"%").Find(&res).Error
	return
}

func (a AlbumRepositoryImpl) GetAlbumsByArtist(artistId string) (res []model.Album, err error) {
	err = a.DB.Where("user_id = ?", artistId).Preload("User").Find(&res).Error
	return
}
