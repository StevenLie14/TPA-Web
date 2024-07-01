package controller

import (
	"back-end/data/request"
	"back-end/data/response"
	"back-end/database"
	"back-end/services"
	"back-end/utils"
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type UserController struct {
	UserService services.UserService
	g           *database.GoogleConf
}

func NewUserController(userService services.UserService, g *database.GoogleConf) *UserController {
	u := UserController{UserService: userService, g: g}
	return &u

}

func (u *UserController) GoogleCallback(ctx *gin.Context) {
	code := ctx.Query("code")

	token, err := u.g.GoogleConfig.Exchange(context.Background(), code)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	userInfo, err := database.GetUserInfo(token.AccessToken)
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

	user, err := u.UserService.LoginWithGoogle(userInfo)
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

	fmt.Println("token : " + user.Token)
	ctx.SetCookie("jwt", user.Token, 24*60*60, "/", "", false, true)

	webResponse := response.WebResponse{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    user,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)
}

func (u *UserController) UpdateVerificationStatus(ctx *gin.Context) {
	id := ctx.Query("id")
	err := u.UserService.UpdateVerificationStatus(id)
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

func (u *UserController) Authenticate(ctx *gin.Context) {
	req := request.AuthRequest{}
	err := ctx.ShouldBindJSON(&req)
	if err != nil {

		webResponse := response.WebResponse{
			Code:    http.StatusUnauthorized,
			Message: err.Error(),
			Data:    nil,
		}

		ctx.Header("Content-Type", "application/json")
		ctx.JSON(http.StatusUnauthorized, webResponse)
		return

	}

	user, err := u.UserService.Authenticate(req)
	if err != nil {
		webResponse := response.WebResponse{
			Code:    http.StatusUnauthorized,
			Message: err.Error(),
			Data:    nil,
		}
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(http.StatusUnauthorized, webResponse)
		return
	}
	ctx.SetCookie("jwt", user.Token, int(24*time.Hour.Seconds()), "/", "", false, true)

	webResponse := response.WebResponse{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    user,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)

}

func (u *UserController) GetCurrentUser(ctx *gin.Context) {
	token, err := ctx.Cookie("jwt")
	if err != nil {
		webResponse := response.WebResponse{
			Code:    http.StatusUnauthorized,
			Message: "Cookie not Found",
			Data:    nil,
		}

		ctx.Header("Content-Type", "application/json")
		ctx.JSON(http.StatusUnauthorized, webResponse)
		return
	}

	user, err := u.UserService.GetCurrentUser(token)
	if err != nil {
		webResponse := response.WebResponse{
			Code:    http.StatusUnauthorized,
			Message: err.Error(),
			Data:    nil,
		}

		ctx.Header("Content-Type", "application/json")
		ctx.JSON(http.StatusUnauthorized, webResponse)
		return
	}

	webResponse := response.WebResponse{
		Code:    http.StatusOK,
		Message: "OK",
		Data:    user,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)

}

func (u *UserController) Register(ctx *gin.Context) {
	req := request.AuthRequest{}
	err := ctx.ShouldBindJSON(&req)
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

	user, err := u.UserService.Register(req)
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
	link := "http://localhost:5173/verify-email?id=" + user.UserId
	err = utils.SendEmail(user.Email, "Verification Email", fmt.Sprintf("Please click this link to verify your email: <a href=\"%s\">Verify Email</a> ", link))
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
		Data:    user,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)

}

func (u *UserController) GetUserById(ctx *gin.Context) {
	id := ctx.Query("id")
	user, err := u.UserService.GetUserById(id)
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
		Data:    user,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)

}

func (u *UserController) UpdateUserProfile(ctx *gin.Context) {
	req := request.UserUpdateRequest{}
	err := ctx.ShouldBindJSON(&req)
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

	user, err := u.UserService.UpdateUserProfile(req)
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
		Data:    user,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, webResponse)

}

//func (c *CareerController) FindAll(ctx *gin.Context) {
//	fmt.Println("Hello World!")
//	careers := c.careerService.FindAll()
//	webResponse := response.WebResponse{
//		Code:   http.StatusOK,
//		Status: "OK",
//		Data:   careers,
//	}
//
//	ctx.Header("Content-Type", "application/json")
//	ctx.JSON(http.StatusOK, webResponse)
//
//}
