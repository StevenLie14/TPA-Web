package services

import (
	"back-end/data/request"
	"back-end/data/response"
	"back-end/model"
	"back-end/repository"
	"back-end/utils"
	"github.com/go-playground/validator/v10"
)

type CareerServiceImpl struct {
	CareerRepository repository.CareerRepository
	Validate         *validator.Validate
}

func NewCareerServiceImpl(CareerRepository repository.CareerRepository, Validate *validator.Validate) *CareerServiceImpl {
	return &CareerServiceImpl{CareerRepository: CareerRepository, Validate: Validate}
}

func (c *CareerServiceImpl) Create(career request.CreateCareerRequest) {
	err := c.Validate.Struct(career)

	utils.CheckError(err)

	careerModel := model.Career{
		Id:         0,
		Title:      career.Title,
		Department: career.Department,
		Location:   career.Department,
	}

	c.CareerRepository.Save(careerModel)
}

func (c *CareerServiceImpl) FindAll() []response.CareerResponse {
	res := c.CareerRepository.FindAll()

	var careers []response.CareerResponse

	for _, career := range res {
		careers = append(careers, response.CareerResponse{
			Id:         career.Id,
			Title:      career.Title,
			Department: career.Department,
			Location:   career.Location,
		})
	}

	return careers
}
