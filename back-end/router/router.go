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

func NewRouter(playlist *controller.PlaylistController, user *controller.UserController, h *sse.NotificationSSE, follow *controller.FollowController, song *controller.SongController, album *controller.AlbumController, queue *controller.QueueController, play *controller.PlayController) *gin.Engine {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:4000", "http://localhost:5173", "http://localhost:8080"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "Origin", "Accept"},
		AllowCredentials: true,
	}))

	pool := websockets.NewPool()
	go pool.Start()

	router.GET("/ws/chat", pool.Chat)

	router.POST("/user/login", user.Authenticate)
	router.POST("/user/edit-prof", user.UpdateUserProfile)
	router.GET("/user/current-user", user.GetCurrentUser)
	router.GET("/user/update-ver", user.UpdateVerificationStatus)
	router.GET("/auth/google/callback", user.GoogleCallback)
	router.PUT("/user/register", user.Register)
	router.GET("/user/get", user.GetUserById)

	router.GET("/playlist", playlist.GetPlaylistByUserId)
	router.GET("/playlist-id", playlist.GetPlaylistById)

	router.GET("/get-following", follow.GetFollowing)
	router.GET("/get-follower", follow.GetFollower)
	router.GET("/get-mutual", follow.GetMutualFollowing)
	router.PUT("/follow", follow.Create)
	router.DELETE("/follow", follow.DeleteFollow)

	router.GET("/album/get-title", album.GetAlbumByTitle)
	router.GET("/album/get-artist", album.GetAlbumByArtist)
	router.GET("/album/get-random", album.GetRandomAlbum)

	router.GET("/song/get-all", song.GetAllSong)
	router.GET("/song/get", song.GetSongById)
	router.GET("/song/get-by-artist", song.GetSongByArtist)
	router.GET("/song/get-by-album", song.GetSongByAlbum)

	router.GET("/queue/clear", queue.ClearQueue)
	router.POST("/queue/enqueue", queue.Enqueue)
	router.GET("/queue/dequeue", queue.Dequeue)
	router.GET("/queue/get", queue.GetQueue)
	router.GET("/queue/get-all", queue.GetAllQueue)

	router.GET("/play/get-last", play.GetLastPlayedSongByUser)

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
		h.NotificationChannel["d3cc72e7-f998-4f2f-b45a-1ab86b8bd233"] <- model.Notification{
			NotifyId: utils.GenerateUUID(),
			UserId:   "d3cc72e7-f998-4f2f-b45a-1ab86b8bd233",
			Title:    "Tes",
			Body:     "Pong",
			Status:   "OK",
			ReadAt:   time.Time{},
		}
	})

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
