package repository

import "back-end/model"

type UserRepository interface {
	Save(user model.User) error
	FindAll() ([]model.User, error)
	FindUserByID(id string) (user model.User, err error)
	FindByEmail(email string) (user model.User, err error)
	FindByEmailAndVerified(email string, verified bool) (user model.User, err error)
	Update(user model.User) (err error)
	Delete(user model.User)
}
