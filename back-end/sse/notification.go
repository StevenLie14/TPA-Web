package sse

import (
	"back-end/model"
	"back-end/services"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"net/http"
	"time"
)

type NotificationSSE struct {
	userService         services.UserService
	NotificationChannel map[string]chan model.Notification
}

func NewNotification(userService services.UserService) *NotificationSSE {
	return &NotificationSSE{
		userService:         userService,
		NotificationChannel: make(map[string]chan model.Notification),
	}

}

//func (n NotificationSSE) StreamNotification(ctx *gin.Context) {
//	ctx.Writer.Header().Set("Cache-Control", "no-cache")
//	ctx.Writer.Header().Set("Connection", "keep-alive")
//	ctx.Writer.Header().Set("Content-Type", "text/event-stream")
//	ctx.Writer.Header().Set("Transfer-Encoding", "chunked")
//
//	token, err := ctx.Cookie("jwt")
//	if err != nil {
//		return
//	}
//	user, err := n.userService.GetCurrentUser(token)
//	if err != nil {
//		return
//	}
//
//	if _, exists := n.NotificationChannel[user.UserId]; !exists {
//		n.NotificationChannel[user.UserId] = make(chan model.Notification)
//	}
//	notify := n.NotificationChannel[user.UserId]
//	ctx.Stream(func(w io.Writer) bool {
//		select {
//		case notification := <-notify:
//			notificationData, err := json.Marshal(notification)
//			if err != nil {
//				fmt.Println("Error marshalling notification:", err)
//				return true
//			}
//
//			event := fmt.Sprintf("event: notif-updated\ndata: %s\n\n", notificationData)
//			_, err = fmt.Fprint(w, event)
//			if err != nil {
//				fmt.Println("Error writing event:", err)
//				return false
//			}
//		case <-ctx.Request.Context().Done():
//			return false
//		}
//		return true
//	})
//
//}

func (n NotificationSSE) StreamNotification(ctx *gin.Context) {
	ctx.Writer.Header().Set("Cache-Control", "no-cache")
	ctx.Writer.Header().Set("Connection", "keep-alive")
	ctx.Writer.Header().Set("Content-Type", "text/event-stream")
	ctx.Writer.Header().Set("Transfer-Encoding", "chunked")

	token, err := ctx.Cookie("jwt")
	if err != nil {
		return
	}
	user, err := n.userService.GetCurrentUser(token)
	if err != nil {
		return
	}

	if _, exists := n.NotificationChannel[user.UserId]; !exists {
		n.NotificationChannel[user.UserId] = make(chan model.Notification)
	}

	ctx.Stream(func(w io.Writer) bool {
		initialEvent := "event: initial\ndata: \n\n"
		_, _ = fmt.Fprint(w, initialEvent)
		if f, ok := w.(http.Flusher); ok {
			f.Flush()
		}
		for notification := range n.NotificationChannel[user.UserId] {
			notificationData, err := json.Marshal(notification)
			if err != nil {
				fmt.Println("Error marshalling notification:", err)
				continue
			}

			event := fmt.Sprintf("event: notif-updated\ndata: %s\n\n", notificationData)
			_, _ = fmt.Fprint(w, event)
			if f, ok := w.(http.Flusher); ok {
				f.Flush()
			}

			time.Sleep(time.Second)

			if ctx.Writer.Status() != http.StatusOK {
				return false
			}
		}
		return true
	})

}
