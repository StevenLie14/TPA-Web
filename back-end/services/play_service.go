package services

import (
	"back-end/data/response"
)

type PlayService interface {
	Get8LastPlayedSongByUser(userId string) (res []response.PlayResponse, err error)
	GetLastPlayedSongByUser(userId string) (res []response.PlayResponse, err error)
}
