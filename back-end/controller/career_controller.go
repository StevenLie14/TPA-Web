package controller

import (
	"back-end/data/request"
	"back-end/data/response"
	"back-end/services"
	"back-end/utils"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CareerController struct {
	careerService services.CareerService
}

func NewCareerController(careerService services.CareerService) *CareerController {
	c := CareerController{careerService: careerService}
	return &c
}

func (c *CareerController) Create(ctx *gin.Context) {
	d := request.CreateCareerRequest{}
	err := ctx.ShouldBindJSON(&d)
	utils.CheckError(err)

	c.careerService.Create(d)
	webResponse := response.WebResponse{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    nil,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)

}

func (c *CareerController) FindAll(ctx *gin.Context) {
	fmt.Println("Hello World!")
	careers := c.careerService.FindAll()
	webResponse := response.WebResponse{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    careers,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)

}
