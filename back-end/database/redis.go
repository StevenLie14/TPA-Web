package database

import (
	"back-end/config"
	"context"
	"github.com/redis/go-redis/v9"
	"time"
)

type Redis struct {
	rdb *redis.Client
}

func NewRedis(config *config.Config) *Redis {
	return &Redis{
		rdb: ConnectRedis(config),
	}
}

func ConnectRedis(config *config.Config) *redis.Client {

	return redis.NewClient(&redis.Options{
		Addr:     config.Redis.Address,
		Password: config.Redis.Password,
		DB:       0,
	})
}

func (r Redis) Get(key string) (string, error) {
	val, err := r.rdb.Get(context.Background(), key).Result()
	if err != nil {
		return "", err
	}
	return val, nil
}

func (r Redis) Set(key string, entry string) error {
	return r.rdb.Set(context.Background(), key, entry, 15*time.Minute).Err()
}
