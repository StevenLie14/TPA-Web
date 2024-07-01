package repository

import "back-end/model"

type QueueRepository interface {
	ClearQueue() error
	Enqueue(song model.Song) error
	Dequeue() (model.Song, error)
	GetQueue() (model.Song, error)
	GetAllQueue() ([]model.Song, error)
}
