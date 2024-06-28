package repository

import "back-end/model"

type CareerRepository interface {
	Save(career model.Career)
	FindAll() []model.Career
}
