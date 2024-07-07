package repository

import (
	"back-end/data/response"
	"back-end/database"
	"back-end/model"
	"gorm.io/gorm"
	"time"
)

type ArtistRepositoryImpl struct {
	DB  *gorm.DB
	rdb *database.Redis
}

func NewArtistRepositoryImpl(DB *gorm.DB, rdb *database.Redis) *ArtistRepositoryImpl {
	return &ArtistRepositoryImpl{DB: DB, rdb: rdb}
}

func (a ArtistRepositoryImpl) GetArtistByUserId(userId string, verified bool) (res model.Artist, err error) {
	if verified {
		err = a.DB.Where("user_id = ? AND verified_at IS NOT NULL", userId).Preload("User").First(&res).Error
	} else {
		err = a.DB.Where("user_id = ? AND verified_at IS NULL", userId).Preload("User").First(&res).Error

	}
	return
}

func (a ArtistRepositoryImpl) GetArtistByArtistId(artistId string, verified bool) (res model.Artist, err error) {
	if verified {
		err = a.DB.Where("artist_id = ? AND verified_at IS NOT NULL", artistId).Preload("User").First(&res).Error
	} else {
		err = a.DB.Where("artist_id = ? AND verified_at IS NULL", artistId).Preload("User").First(&res).Error
	}
	return
}

func (a ArtistRepositoryImpl) GetUnverifiedArtist() (res []model.Artist, err error) {
	err = a.DB.Where("verified_at IS NULL").Preload("User").Find(&res).Error
	return
}

func (a ArtistRepositoryImpl) CreateArtist(artist model.Artist) error {
	err := a.DB.Create(&artist).Error
	return err
}

func (a ArtistRepositoryImpl) UpdateVerifyArtist(artistId string, verifiedAt time.Time) error {
	err := a.DB.Model(&model.Artist{}).Where("artist_id = ?", artistId).Update("verified_at", verifiedAt).Error
	return err
}

func (a ArtistRepositoryImpl) DeleteArtist(artistId string) error {
	err := a.DB.Where("artist_id = ?", artistId).Delete(&model.Artist{}).Error
	return err
}

func (a ArtistRepositoryImpl) GetArtistByName(name string) (res []response.ArtistSearch, err error) {

	err = a.DB.Table("artists AS a").
		Select("a.artist_id,a.user_id,u.username, COUNT(f.following_id) AS follow_count").
		Joins("LEFT JOIN users u ON a.user_id = u.user_id").
		Joins("LEFT JOIN follows f ON f.following_id = a.user_id").
		Where("UPPER(u.username) LIKE ?", "%"+name+"%").
		Group("a.user_id, u.username,a.artist_id").
		Order("follow_count DESC").
		Limit(6).
		Scan(&res).Error
	return
}
