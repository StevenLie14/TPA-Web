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
	panic("implement me")
}

func (p PlaylistRepositoryImpl) GetByUserID(id string) (res []model.Playlist, err error) {
	err = p.DB.Where("user_id", id).Preload("User").Preload("PlaylistDetails").Preload("PlaylistDetails.Song").Preload("PlaylistDetails.Song.Artist").Preload("PlaylistDetails.Song.Album").Preload("PlaylistDetails.Song.Artist.User").Find(&res).Error
	return
}

func (p PlaylistRepositoryImpl) GetPlaylistByID(id string) (res model.Playlist, err error) {
	err = p.DB.Where("playlist_id", id).Preload("User").Preload("PlaylistDetails").Preload("PlaylistDetails.Song").Preload("PlaylistDetails.Song.Artist").Preload("PlaylistDetails.Song.Artist.User").Preload("PlaylistDetails.Song.Album").Find(&res).Error
	return
}

func (p PlaylistRepositoryImpl) Create(playlist model.Playlist) error {
	err := p.DB.Create(&playlist).Error
	return err
}

func (p PlaylistRepositoryImpl) CreateDetail(playlistDetail model.PlaylistDetails) error {
	err := p.DB.Create(&playlistDetail).Error
	return err
}

func (p PlaylistRepositoryImpl) DeletePlaylistDetailByID(id string) error {
	err := p.DB.Where("playlist_detail_id", id).Delete(&model.PlaylistDetails{}).Error
	return err
}

func (p PlaylistRepositoryImpl) DeletePlaylistByID(id string) error {
	err := p.DB.Where("playlist_id", id).Delete(&model.Playlist{}).Error
	return err
}
