package main

import (
	"back-end/config"
	"back-end/controller"
	"back-end/database"
	"back-end/repository"
	"back-end/router"
	"back-end/services"
	"back-end/sse"
	"back-end/utils"
	"github.com/go-playground/validator/v10"
	"net/http"
)

func main() {
	cnf := config.LoadEnv()
	db := database.ConnectDB(cnf)
	redis := database.NewRedis(cnf)
	google := database.NewGoogle(cnf)

	//broadcast := sse.NewBroadCast()
	//go broadcast.Listen()

	validate := validator.New()

	careerRepository := repository.NewCareerRepositoryImpl(db)
	careerService := services.NewCareerServiceImpl(careerRepository, validate)
	careerController := controller.NewCareerController(careerService)

	userRepository := repository.NewUserRepositoryImpl(db, redis)
	userService := services.NewUserServiceImpl(userRepository, validate)
	userController := controller.NewUserController(userService, google)

	notificationChannel := sse.NewNotification(userService)
	r := router.NewRouter(careerController, userController, notificationChannel)

	server := &http.Server{
		Addr:    cnf.Server.Port,
		Handler: r,
	}

	err := server.ListenAndServe()
	utils.CheckError(err)

}
