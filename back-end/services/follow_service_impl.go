package services

import (
	"back-end/data/request"
	"back-end/model"
	"back-end/repository"
	"fmt"
	"github.com/go-playground/validator/v10"
)

type FollowServiceImpl struct {
	FollowRepository repository.FollowRepository
	Validate         *validator.Validate
}

func NewFollowServiceImpl(FollowRepository repository.FollowRepository, Validate *validator.Validate) *FollowServiceImpl {
	return &FollowServiceImpl{FollowRepository: FollowRepository, Validate: Validate}
}

func (f FollowServiceImpl) Create(follow request.FollowRequest) error {
	err := f.Validate.Struct(follow)
	if err != nil {
		return err
	}

	follows := model.Follow{
		FollowerId:  follow.FollowerID,
		FollowingId: follow.FollowID,
	}

	err = f.FollowRepository.Create(follows)
	return err
}

func (f FollowServiceImpl) GetFollowing(followerID string) ([]model.Follow, error) {
	fmt.Println("fl " + followerID)
	res, err := f.FollowRepository.GetFollowing(followerID)
	return res, err
}

func (f FollowServiceImpl) GetFollower(followingID string) ([]model.Follow, error) {
	res, err := f.FollowRepository.GetFollower(followingID)
	return res, err
}

func (f FollowServiceImpl) DeleteFollow(follow request.FollowRequest) error {
	err := f.Validate.Struct(follow)
	if err != nil {
		return err
	}

	follows := model.Follow{
		FollowerId:  follow.FollowerID,
		FollowingId: follow.FollowID,
	}

	err = f.FollowRepository.DeleteFollow(follows)
	return err
}

func (f FollowServiceImpl) GetMutualFollowing(followerID string) ([]model.Follow, error) {
	var mutual []model.Follow

	res, err := f.FollowRepository.GetFollowing(followerID)
	if err != nil {
		return res, err
	}
	for _, follow := range res {
		result, err := f.FollowRepository.GetMutualFollowing(follow.FollowingId, followerID)
		if err != nil {
			continue
		}
		mutual = append(mutual, result...)
	}

	return mutual, err
}
