package controller

import (
	"back-end/data/response"
	"back-end/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

type SongController struct {
	SongService services.SongService
}

func NewSongController(songService services.SongService) *SongController {
	return &SongController{SongService: songService}
}

func (s SongController) GetAllSong(ctx *gin.Context) {
	res, err := s.SongService.GetAllSong()
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

func (s SongController) GetSongById(ctx *gin.Context) {
	id := ctx.Query("id")

	res, err := s.SongService.GetSongById(id)
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

func (s SongController) GetSongByArtist(ctx *gin.Context) {
	artistId := ctx.Query("id")

	res, err := s.SongService.GetSongByArtist(artistId)
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

func (s SongController) GetSongByAlbum(ctx *gin.Context) {
	albumId := ctx.Query("id")

	res, err := s.SongService.GetSongByAlbum(albumId)
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
