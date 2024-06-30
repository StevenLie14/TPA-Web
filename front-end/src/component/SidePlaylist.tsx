
export const SidePlaylist = ({playlist} : {playlist : Playlist}) => {


    return (
        <div className="sidePlaylist" key={playlist.playlistId}>
            <img src={playlist.Image} alt={""}/>
            <div className={"sidePlaylistContent"}>
                <h3>{playlist.Title}</h3>
                <p>{playlist.User.username}</p>
            </div>
        </div>
    )
}