export const PlaylistTable = ({detail,index}  : {detail : PlaylistDetail,index :number}) => {
    return (
        <div className={"playlistTable"}>
            <div className={"title"}>
                <p>{index+1}. </p>
                <img src={detail.song.album.banner} alt="Song Cover"/>
                <div>
                    <h3>{detail.song.title}</h3>
                    <p>{detail.song.user?.username}</p>
                </div>
            </div>
            <p>{detail.song.album.title}</p>
            <p>{new Date(detail.dateAdded).toLocaleDateString('en-US',{
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</p>
            <p>{Math.floor(detail.song.duration / 60)}:{Math.floor(detail.song.duration % 60).toString().padStart(2, '0')}</p>
        </div>
    )
}