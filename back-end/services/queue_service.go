package services

import (
	"back-end/data/response"
	"back-end/model"
)

type QueueService interface {
	ClearQueue() error
	Enqueue(song model.Song) error
	Dequeue() (response.SongResponse, error)
	GetQueue() (response.SongResponse, error)
	GetAllQueue() ([]response.SongResponse, error)
}
