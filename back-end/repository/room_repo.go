package repository

import "back-end/model"

type RoomRepository interface {
	SaveRoom(room model.Rooms) error
	SaveRoomDetail(roomDetail model.RoomDetail) error
	FindRoomByUserID(id string) (room []model.Rooms, err error)
	UpdateRoom(user model.Rooms)
	UpdateRoomDetail(user model.RoomDetail)
	DeleteRoom(user model.Rooms)
	DeleteRoomDetail(user model.RoomDetail)
}
