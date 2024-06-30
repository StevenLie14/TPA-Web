export const AlbumTable = ({song,index} : {song : Song,index : number}) => {
    return (
        <div className={"albumTable"}>
            <div className={"title"}>
                <p>{index+1}. </p>
                <img src={song.album.banner} alt="Song Cover"/>
                <div>
                    <h3>{song.title}</h3>
                    <p>{song.album?.title}</p>
                </div>
            </div>
            <p>{Math.floor(song.duration / 60)}:{Math.floor(song.duration % 60).toString().padStart(2, '0')}</p>
        </div>
    )
}