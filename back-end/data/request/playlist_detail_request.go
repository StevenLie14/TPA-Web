package request

type PlayListDetailRequest struct {
	PlaylistID string `json:"playlistId"`
	SongID     string `json:"songId"`
}
