package repository

import (
	"back-end/database"
	"back-end/model"
	"gorm.io/gorm"
)

type RoomRepositoryImpl struct {
	DB  *gorm.DB
	rdb *database.Redis
}

func NewRoomRepositoryImpl(DB *gorm.DB, rdb *database.Redis) *RoomRepositoryImpl {
	return &RoomRepositoryImpl{DB: DB, rdb: rdb}
}

func (r RoomRepositoryImpl) SaveRoom(room model.Rooms) error {
	//TODO implement me
	panic("implement me")
}

func (r RoomRepositoryImpl) SaveRoomDetail(roomDetail model.RoomDetail) error {
	//TODO implement me
	panic("implement me")
}

func (r RoomRepositoryImpl) FindRoomByUserID(id string) (room []model.Rooms, err error) {
	//TODO implement me
	panic("implement me")
}

func (r RoomRepositoryImpl) UpdateRoom(user model.Rooms) {

}

func (r RoomRepositoryImpl) UpdateRoomDetail(user model.RoomDetail) {
	//TODO implement me
	panic("implement me")
}

func (r RoomRepositoryImpl) DeleteRoom(user model.Rooms) {
	//TODO implement me
	panic("implement me")
}

func (r RoomRepositoryImpl) DeleteRoomDetail(user model.RoomDetail) {
	//TODO implement me
	panic("implement me")
}
