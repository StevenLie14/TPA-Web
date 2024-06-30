package controller

import (
	"back-end/data/response"
	"back-end/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

type PlaylistController struct {
	PlaylistService services.PlaylistService
}

func NewPlaylistController(playlistService services.PlaylistService) *PlaylistController {
	return &PlaylistController{PlaylistService: playlistService}
}

func (p *PlaylistController) GetPlaylistByUserId(ctx *gin.Context) {
	id := ctx.Query("id")

	res, err := p.PlaylistService.GetByUserID(id)
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

func (p *PlaylistController) GetPlaylistById(ctx *gin.Context) {
	id := ctx.Query("id")

	res, err := p.PlaylistService.GetPlaylistByID(id)
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
