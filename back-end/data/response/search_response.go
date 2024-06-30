package response

type SearchResponse struct {
	Payload interface{} `json:"payload"`
	Type    string      `json:"type"`
	Count   int         `json:"count"`
}
