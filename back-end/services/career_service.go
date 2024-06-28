package services

import (
	"back-end/data/request"
	"back-end/data/response"
)

type CareerService interface {
	Create(career request.CreateCareerRequest)
	FindAll() []response.CareerResponse
}
