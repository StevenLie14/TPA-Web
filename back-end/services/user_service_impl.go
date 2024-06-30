package services

import (
	"back-end/data/request"
	"back-end/data/response"
	"back-end/model"
	"back-end/repository"
	"back-end/utils"
	"fmt"
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
	"time"
)

type UserServiceImpl struct {
	UserRepository repository.UserRepository
	Validate       *validator.Validate
}

func NewUserServiceImpl(UserRepository repository.UserRepository, Validate *validator.Validate) *UserServiceImpl {
	return &UserServiceImpl{UserRepository: UserRepository, Validate: Validate}
}

func (u UserServiceImpl) Authenticate(req request.AuthRequest) (res response.AuthResponse, err error) {
	user, err := u.UserRepository.FindByEmailAndVerified(req.Email, true)
	if err != nil {
		return response.AuthResponse{}, utils.UserNotFound
	}

	if err = bcrypt.CompareHashAndPassword(*user.Password, []byte(req.Password)); err != nil {
		return response.AuthResponse{}, utils.InvalidPassword
	}

	token, err := utils.GenerateJWT(user)
	if err != nil {
		return response.AuthResponse{}, err
	}

	authResponse := response.AuthResponse{
		UserId:   user.UserId,
		Username: user.Username,
		Email:    user.Email,
		Role:     user.Role,
		Token:    token,
	}

	return authResponse, nil

}

func (u UserServiceImpl) Register(req request.AuthRequest) (res response.UserResponse, err error) {
	err = u.Validate.Struct(req)

	if err != nil {

		return response.UserResponse{}, err
	}

	user, err := u.UserRepository.FindByEmailAndVerified(req.Email, true)
	if err == nil {
		return response.UserResponse{}, utils.UserAlreadyExist
	}

	fmt.Println(req.Password)
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return response.UserResponse{}, err
	}

	user, err = u.UserRepository.FindByEmailAndVerified(req.Email, false)
	if err != nil {
		user = model.User{
			UserId:     utils.GenerateUUID(),
			Username:   "st",
			Password:   &hashedPassword,
			GoogleId:   nil,
			Role:       "Listener",
			VerifiedAt: nil,
			Email:      req.Email,
			Gender:     nil,
			Country:    nil,
			Avatar:     nil,
		}
		err = u.UserRepository.Save(user)
		if err != nil {
			return response.UserResponse{}, err
		}
	}

	return response.UserResponse{
		UserId:   user.UserId,
		Username: user.Username,
		Email:    user.Email,
		Role:     user.Role,
	}, nil
}

func (u UserServiceImpl) UpdateVerificationStatus(id string) error {
	user, err := u.UserRepository.FindUserByID(id)
	if err != nil {
		return err
	}
	now := time.Now()
	user.VerifiedAt = &now
	err = u.UserRepository.Update(user)
	if err != nil {
		return err
	}
	return nil
}

func (u UserServiceImpl) GetCurrentUser(cookie string) (res response.UserResponse, err error) {
	userId, err := utils.GetJWTClaims(cookie)

	user, err := u.UserRepository.FindUserByID(userId)
	if err != nil {
		return response.UserResponse{}, utils.UserNotFound
	}
	return response.UserResponse{
		UserId:   user.UserId,
		Username: user.Username,
		Email:    user.Email,
		Role:     user.Role,
	}, nil

}

func (u UserServiceImpl) LoginWithGoogle(req request.GoogleRequest) (res response.AuthResponse, err error) {
	now := time.Now()
	user := model.User{
		UserId:     utils.GenerateUUID(),
		Username:   req.Username,
		Password:   nil,
		GoogleId:   &req.GoogleId,
		Role:       "Listener",
		VerifiedAt: &now,
		Email:      req.Email,
		Gender:     nil,
		Country:    nil,
		Avatar:     nil,
	}

	user2, err := u.UserRepository.FindByEmail(req.Email)
	if err == nil {
		user2.GoogleId = &req.GoogleId
		err = u.UserRepository.Update(user2)
		if err != nil {
			return response.AuthResponse{}, err
		}
		user = user2
	} else {
		err = u.UserRepository.Save(user)
		if err != nil {
			return response.AuthResponse{}, err
		}
	}

	token, err := utils.GenerateJWT(user)
	if err != nil {
		return response.AuthResponse{}, err
	}
	return response.AuthResponse{
		UserId:   user.UserId,
		Username: user.Username,
		Email:    user.Email,
		Role:     user.Role,
		Token:    token,
	}, nil
}

func (u UserServiceImpl) GetUserById(id string) (res response.UserResponse, err error) {
	user, err := u.UserRepository.FindUserByID(id)
	if err != nil {
		return response.UserResponse{}, utils.UserNotFound
	}
	return response.UserResponse{
		UserId:      user.UserId,
		Username:    user.Username,
		Email:       user.Email,
		Role:        user.Role,
		Avatar:      user.Avatar,
		Country:     user.Country,
		Gender:      user.Gender,
		Description: user.Description,
	}, nil
}
