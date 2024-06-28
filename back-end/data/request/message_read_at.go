package request

type MessageReadRequest struct {
	MessageId string `json:"messageId"`
	UserId    string `json:"UserId"`
}
