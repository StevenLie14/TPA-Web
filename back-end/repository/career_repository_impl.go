package repository

import (
	"back-end/model"
	"back-end/utils"
	"gorm.io/gorm"
)

type CareerRepositoryImpl struct {
	DB *gorm.DB
}

func NewCareerRepositoryImpl(DB *gorm.DB) *CareerRepositoryImpl {
	c := CareerRepositoryImpl{DB: DB}
	return &c
}

func (c *CareerRepositoryImpl) Save(career model.Career) {
	result := c.DB.Create(&career)
	utils.CheckError(result.Error)

}

func (c *CareerRepositoryImpl) FindAll() []model.Career {
	var careers []model.Career
	result := c.DB.Find(&careers)
	utils.CheckError(result.Error)
	return careers

}
