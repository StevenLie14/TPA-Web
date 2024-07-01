package services

import (
	"back-end/data/response"
)

type PlayService interface {
	GetLastPlayedSongByUser(userId string) (res []response.PlayResponse, err error)
}
