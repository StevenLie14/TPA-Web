package controller

import (
	"back-end/data/request"
	"back-end/data/response"
	"back-end/model"
	"back-end/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

type QueueController struct {
	QueueService services.QueueService
}

func NewQueueController(queueService services.QueueService) *QueueController {
	return &QueueController{QueueService: queueService}
}

func (q QueueController) ClearQueue(ctx *gin.Context) {
	err := q.QueueService.ClearQueue()
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
		Data:    "cleared",
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)
}

func (q QueueController) Enqueue(ctx *gin.Context) {
	var song request.SongRequest
	err := ctx.ShouldBindJSON(&song)
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

	songs := model.Song{
		SongId:      song.SongId,
		Title:       song.Title,
		ArtistId:    song.ArtistId,
		AlbumId:     song.AlbumId,
		Genre:       song.Genre,
		ReleaseDate: song.ReleaseDate,
		Duration:    song.Duration,
		File:        song.File,
		Image:       song.Image,
		Album:       song.Album,
		Play:        song.Play,
		Artist:      song.Artist,
	}
	err = q.QueueService.Enqueue(songs)
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
		Data:    nil,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)
}

func (q QueueController) Dequeue(ctx *gin.Context) {
	song, err := q.QueueService.Dequeue()
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
	res := response.SongResponse{
		SongId:      song.SongId,
		Title:       song.Title,
		ArtistId:    song.ArtistId,
		AlbumId:     song.AlbumId,
		Genre:       song.Genre,
		ReleaseDate: song.ReleaseDate,
		Duration:    song.Duration,
		File:        song.File,
		Image:       song.Image,
		Album:       song.Album,
		Play:        song.Play,
		Artist:      song.Artist,
	}

	webResponse := response.WebResponse{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    res,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)
}

func (q QueueController) GetQueue(ctx *gin.Context) {
	song, err := q.QueueService.GetQueue()
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
	res := response.SongResponse{
		SongId:      song.SongId,
		Title:       song.Title,
		ArtistId:    song.ArtistId,
		AlbumId:     song.AlbumId,
		Genre:       song.Genre,
		ReleaseDate: song.ReleaseDate,
		Duration:    song.Duration,
		File:        song.File,
		Image:       song.Image,
		Album:       song.Album,
		Play:        song.Play,
		Artist:      song.Artist,
	}

	webResponse := response.WebResponse{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    res,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)
}

func (q QueueController) GetAllQueue(ctx *gin.Context) {
	songs, err := q.QueueService.GetAllQueue()
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
		Data:    songs,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)
}
