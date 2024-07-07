package router

import (
	"back-end/controller"
	"back-end/middleware"
	"back-end/model"
	"back-end/sse"
	"back-end/utils"
	"back-end/websockets"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"time"
)

func NewRouter(playlist *controller.PlaylistController, user *controller.UserController, h *sse.NotificationSSE, follow *controller.FollowController, song *controller.SongController, album *controller.AlbumController, queue *controller.QueueController, play *controller.PlayController, artist *controller.ArtistController, setting *controller.NotificationSettingController, search *controller.SearchController, adv *controller.AdvertisementController) *gin.Engine {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:4000", "http://localhost:5173", "http://localhost:8080"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "Origin", "Accept"},
		AllowCredentials: true,
	}))

	pool := websockets.NewPool()
	go pool.Start()

	router.Static("/public/images/", "./assets/images")
	router.Static("/public/adv/", "./assets/advertise/image")
	router.Static("/public/songs/", "./assets/songs")

	router.GET("/ws/chat", pool.Chat)

	router.POST("/user/login", user.Authenticate)
	router.POST("/user/edit-prof", user.UpdateUserProfile)
	router.GET("/user/current-user", user.GetCurrentUser)
	router.POST("/user/update-ver", user.UpdateVerificationStatus)
	router.GET("/auth/google/callback", user.GoogleCallback)
	router.PUT("/user/register", user.Register)
	router.GET("/user/get", user.GetUserById)
	router.GET("/user/get-all", user.GetAllUser)
	router.POST("/user/sign-out", user.SignOut)
	router.POST("/user/forgot-password", user.Forgot)
	router.POST("/user/reset-password", user.ResetPassword)
	router.GET("/user/valid-verify", user.GetUserByVerifyLink)
	router.GET("/user/logout", user.Logout)
	router.POST("/user/update-pic", user.UpdateProfilePicture)

	router.GET("/playlist", playlist.GetPlaylistByUserId)
	router.GET("/playlist-id", playlist.GetPlaylistById)
	router.POST("/playlist-detail", playlist.CreateDetail)
	router.DELETE("/playlist-detail", playlist.DeletePlaylistDetail)
	router.DELETE("/playlist", playlist.DeletePlaylist)
	router.POST("/playlist/create", playlist.CreatePlaylist)

	router.GET("/get-following", follow.GetFollowing)
	router.GET("/get-follower", follow.GetFollower)
	router.GET("/get-mutual", follow.GetMutualFollowing)
	router.PUT("/follow", follow.Create)
	router.DELETE("/follow", follow.DeleteFollow)

	router.GET("/album/get-artist", album.GetAlbumByArtist)
	router.GET("/album/get-random", album.GetRandomAlbum)
	router.POST("/album/create", album.CreateAlbum)

	router.POST("/song/create", song.CreateSong)
	router.GET("/song/get-all", song.GetAllSong)
	router.GET("/song/get", song.GetSongById)
	router.GET("/song/get-by-artist", song.GetSongByArtist)
	router.GET("/song/get-by-album", song.GetSongByAlbum)

	router.GET("/queue/clear", queue.ClearQueue)
	router.POST("/queue/enqueue", queue.Enqueue)
	router.GET("/queue/dequeue", queue.Dequeue)
	router.GET("/queue/get", queue.GetQueue)
	router.GET("/queue/get-all", queue.GetAllQueue)
	router.POST("/queue/remove", queue.RemoveFromQueue)

	router.GET("/play/get-last", play.Get8LastPlayedSongByUser)
	router.GET("/play/get-last-rec", play.GetLastPlayedSongByUser)

	router.GET("/artist/get", artist.GetArtistByUserId)
	router.GET("/artist/get-id", artist.GetArtistByArtistId)
	router.POST("/artist/create", artist.CreateArtist)
	router.PUT("/artist/update", artist.UpdateVerifyArtist)
	router.DELETE("/artist/delete", artist.DeleteArtist)
	router.GET("/artist/get-unverified", artist.GetUnverifiedArtist)

	router.POST("/setting/update", setting.UpdateSetting)

	router.GET("/search/get", search.Search)

	router.GET("/adv/get", adv.GetRandomAdvertisement)

	//careerGroup := router.Group("/career")
	//careerGroup.Use(middleware.RoleMiddleware(user.UserService, "JLA"))
	//{
	//	careerGroup.POST("/", career.Create)
	//	careerGroup.GET("/", career.FindAll)
	//}

	authGroup := router.Group("/auth")
	authGroup.Use(middleware.AuthMiddleware(user.UserService))
	{
		authGroup.GET("/user", user.GetCurrentUser)
	}

	//router.POST("/career", middleware.AuthMiddleware(user.UserService), career.Create)
	//router.GET("/career", middleware.RoleMiddleware(user.UserService, "JLA"), career.FindAll)

	router.GET("sse/notification-stream", h.StreamNotification)

	//TESTING
	router.GET("/send", func(c *gin.Context) {
		id := c.Query("id")
		h.NotificationChannel[id] <- model.Notification{
			NotifyId: utils.GenerateUUID(),
			UserId:   "d3cc72e7-f998-4f2f-b45a-1ab86b8bd233",
			Title:    "Tes",
			Body:     "Pong",
			Status:   "OK",
			ReadAt:   time.Time{},
		}
	})

	router.GET("/music", song.StreamMusic)
	router.GET("/adv", adv.StreamAdv)

	return router
}

//	router.GET("/stream", func(c *gin.Context) {
//		// Set necessary headers for SSE
//		c.Writer.Header().Set("Content-Type", "text/event-stream")
//		c.Writer.Header().Set("Cache-Control", "no-cache")
//		c.Writer.Header().Set("Connection", "keep-alive")
//
//		// Use the gin context's stream method to continuously write data to the client
//		c.Stream(func(w io.Writer) bool {
//			for {
//				select {}
//				// Write some data to the client
//				fmt.Fprintf(w, "data: %s\n\n", time.Now().Format(time.RFC3339))
//
//				// Flush the data immediately instead of buffering it
//				if f, ok := w.(http.Flusher); ok {
//					f.Flush()
//				}
//
//				// Sleep for a bit to simulate some delay
//				time.Sleep(time.Second)
//
//				// Check if the client has closed the connection
//				if c.Writer.Status() != http.StatusOK {
//					return false
//				}
//			}
//		})
//	})
