package controller

import (
	"back-end/data/response"
	"back-end/services"
	"github.com/gin-gonic/gin"
	"io"
	"net/http"
	"os"
)

type AdvertisementController struct {
	AdvertisementService services.AdvertisementService
}

func NewAdvertisementController(advertisementService services.AdvertisementService) *AdvertisementController {
	return &AdvertisementController{AdvertisementService: advertisementService}
}

func (a AdvertisementController) GetRandomAdvertisement(ctx *gin.Context) {
	res, err := a.AdvertisementService.GetRandomAdvertisement()
	if err != nil {
		webResponse := response.WebResponse{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
			Data:    nil,
		}

		ctx.Header("Content-Type", "application/json")
		ctx.JSON(http.StatusBadRequest, webResponse)
		return
	}

	webResponse := response.WebResponse{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    res,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)
}

func (a AdvertisementController) StreamAdv(c *gin.Context) {
	id := c.Query("id")
	adv, err := a.AdvertisementService.GetAdvertisementById(id)
	if err != nil {
		webResponse := response.WebResponse{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
			Data:    nil,
		}

		c.Header("Content-Type", "application/json")
		c.JSON(http.StatusBadRequest, webResponse)
		return
	}

	file, err := os.Open(adv.Link)
	if err != nil {
		panic(err)
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {

		}
	}(file)

	c.Header("Content-Type", "audio/mpeg")
	c.Header("Transfer-Encoding", "chunked")

	buffer := make([]byte, 1024*1024)
	for {
		bytesRead, err := file.Read(buffer)
		if err != nil && err != io.EOF {
			panic(err)
		}
		if bytesRead == 0 {
			break
		}

		c.Writer.Write(buffer[:bytesRead])
		c.Writer.Flush()
	}
}
