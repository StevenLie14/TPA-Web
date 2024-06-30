package model

type Advertisement struct {
	AdvertisementId string `gorm:"primaryKey"`
	PublisherId     string
	Image           string
	Link            string
	Publisher       User `gorm:"foreignKey:PublisherId;references:UserId"`
}
