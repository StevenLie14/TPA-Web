package model

import "time"

type User struct {
	UserId     string     `gorm:"primaryKey"`
	Username   string     `gorm:"not null"`
	Password   *[]byte    `gorm:""`
	GoogleId   *string    `gorm:""`
	Role       string     `gorm:"not null"`
	VerifiedAt *time.Time `gorm:""`
	Email      string     `gorm:"unique,not null"`
}
