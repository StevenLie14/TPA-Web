interface Playlist {
    playlistId: string;
    UserId : string;
    Title: string;
    Description: string;
    Image: string;
    User : User;
    PlaylistDetails : PlaylistDetail[];
}

interface PlaylistDetail{
    playlistDetailId: string;
    playlistId: string;
    songId: string;
    song : Song;
    dateAdded : string;
}