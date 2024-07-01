package repository

import (
	"back-end/database"
	"back-end/model"
	"encoding/json"
	"errors"
)

type QueueRepositoryImpl struct {
	rdb *database.Redis
}

func NewQueueRepositoryImpl(rdb *database.Redis) *QueueRepositoryImpl {
	return &QueueRepositoryImpl{rdb: rdb}
}

var queue = "songQueue"

func (q *QueueRepositoryImpl) ClearQueue() error {
	return q.rdb.Del(queue)
}

func (q *QueueRepositoryImpl) Enqueue(song model.Song) error {
	songBytes, err := json.Marshal(song)
	if err != nil {
		return err
	}
	return q.rdb.RPush(queue, songBytes)
}

func (q *QueueRepositoryImpl) Dequeue() (model.Song, error) {
	songBytes, err := q.rdb.LPop(queue)
	if err != nil {
		return model.Song{}, err
	}
	if songBytes == nil {
		return model.Song{}, errors.New("queue is empty")
	}

	var song model.Song
	if err := json.Unmarshal(songBytes, &song); err != nil {
		return model.Song{}, err
	}

	return song, nil
}

func (q *QueueRepositoryImpl) GetQueue() (model.Song, error) {
	songBytes, err := q.rdb.LIndex(queue, 0)
	if err != nil {
		return model.Song{}, err
	}
	if songBytes == nil {
		return model.Song{}, errors.New("queue is empty")
	}

	var song model.Song
	if err := json.Unmarshal(songBytes, &song); err != nil {
		return model.Song{}, err
	}

	return song, nil
}

func (q *QueueRepositoryImpl) GetAllQueue() ([]model.Song, error) {
	songBytes, err := q.rdb.LRange(queue, 0, -1)
	if err != nil {
		return nil, err
	}

	var songs []model.Song
	for _, songByte := range songBytes {
		var song model.Song
		if err := json.Unmarshal(songByte, &song); err != nil {
			return nil, err
		}
		songs = append(songs, song)
	}

	return songs, nil
}
