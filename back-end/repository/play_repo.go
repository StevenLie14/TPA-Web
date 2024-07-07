package repository

import "back-end/model"

type PlayRepository interface {
	Get8LastPlayedSongByUser(userId string) (res []model.Play, err error)
	GetLastPlayedSongByUser(userId string) (res []model.Play, err error)
}
