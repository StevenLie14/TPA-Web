package repository

import (
	"back-end/database"
	"back-end/model"
	"encoding/json"
	"gorm.io/gorm"
)

type UserRepositoryImpl struct {
	DB  *gorm.DB
	rdb *database.Redis
}

func NewUserRepositoryImpl(DB *gorm.DB, rdb *database.Redis) *UserRepositoryImpl {
	return &UserRepositoryImpl{DB: DB, rdb: rdb}
}

func (u UserRepositoryImpl) Save(user model.User) error {
	err := u.DB.Create(&user).Error
	return err
}

func (u UserRepositoryImpl) FindAll() (users []model.User, err error) {

	redisUser, err := u.rdb.Get("users")
	if err == nil {
		u.DB.Find(&users)
		userJSON, err := json.Marshal(users)
		if err != nil {
			return users, err
		}
		_ = u.rdb.Set("a", string(userJSON))

		return users, nil
	} else {
		if err := json.Unmarshal([]byte(redisUser), &users); err != nil {
			return users, err
		}
		return users, nil
	}

}

func (u UserRepositoryImpl) FindUserByID(id string) (user model.User, err error) {
	err = u.DB.Where("user_id = ?", id).First(&user).Error
	return
}

func (u UserRepositoryImpl) FindByEmailAndVerified(id string, verified bool) (user model.User, err error) {
	if verified {
		err = u.DB.Where("email = ? AND verified_at IS NOT NULL", id).First(&user).Error
	} else {
		err = u.DB.Where("email = ? AND verified_at IS NULL", id).First(&user).Error
	}
	return
}

func (u UserRepositoryImpl) FindByEmail(email string) (user model.User, err error) {
	err = u.DB.Where("email = ?", email).First(&user).Error
	return
}

func (u UserRepositoryImpl) Update(user model.User) (err error) {
	err = u.DB.Save(&user).Error
	return
}

func (u UserRepositoryImpl) Delete(user model.User) {
	//TODO implement me
	panic("implement me")
}
