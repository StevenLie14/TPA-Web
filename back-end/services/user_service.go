package services

import (
	"back-end/data/request"
	"back-end/data/response"
)

type UserService interface {
	Authenticate(req request.AuthRequest) (res response.AuthResponse, err error)
	GetCurrentUser(token string) (res response.UserResponse, err error)
	Register(req request.AuthRequest) (res response.UserResponse, err error)
	LoginWithGoogle(req request.GoogleRequest) (res response.AuthResponse, err error)
	UpdateVerificationStatus(id string) (err error)
	GetUserById(id string) (res response.UserResponse, err error)
	UpdateUserProfile(req request.UserUpdateRequest) (res response.UserResponse, err error)
}
