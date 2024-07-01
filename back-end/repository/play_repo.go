package repository

import "back-end/model"

type PlayRepository interface {
	GetLastPlayedSongByUser(userId string) (res []model.Play, err error)
}
