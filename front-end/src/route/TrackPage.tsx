import {SideBar} from "../component/SideBar.tsx";
import {Main} from "../component/Main.tsx";
import {Play} from "lucide-react";
import {FollowButton} from "../component/FollowButton.tsx";
import {SongTable} from "../component/SongTable.tsx";
import { useParams} from "react-router-dom";
import {RightSideBar} from "../component/RightSideBar.tsx";
import {ControlMusic} from "../component/ControlMusic.tsx";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {AlbumTable} from "../component/AlbumTable.tsx";

export const TrackPage = () => {
    const {id} = useParams<string>()
    const [song,setSong] = useState<Song>({} as Song)
    const [topTrack, setTopTrack] = useState<Song[]>([])
    const [albumSong, setAlbumSong] = useState<Song[]>([])

    useEffect(() => {
       axios.get("http://localhost:4000/song/get?id="+id).then((res : AxiosResponse<WebResponse<Song>>) => {
           const songs = res.data.data
           setSong(res.data.data)
           console.log(songs)
           axios.get("http://localhost:4000/song/get-by-artist?id="+songs.userId).then((res : AxiosResponse<WebResponse<Song[]>>) => {
               setTopTrack(res.data.data)
           }).catch((err) => {
               console.log(err)
           });
           axios.get("http://localhost:4000/song/get-by-album?id="+songs.albumId).then((res : AxiosResponse<WebResponse<Song[]>>) => {
               // console.log(res)
               setAlbumSong(res.data.data)
           }).catch((err) => {
               console.log(err)
           })
       }).catch((err) => {
           console.log(err)
       })

    }, [id]);
    
    return (
        <div className={"outer"}>
            <div className={"App"}>
                <SideBar/>

                <Main setSearch={null}>
                    <div className={"profileHeader"}>
                        <div>
                            <img className={"song"} src={song.image} alt={"avatar"}/>
                        </div>
                        <div>
                            <p>Song</p>
                            <h1>{song.title}</h1>
                            <div className={"songDescription"}>
                                <img src={song.user?.avatar}
                                     alt={"avatar"}/> - {song.user?.username} - {song?.releaseDate} - {Math.floor(song.duration / 60)}:{Math.floor(song.duration % 60).toString().padStart(2, '0')} - {song.play?.length}
                            </div>
                        </div>
                    </div>
                    <div className={"artistPlay"}>
                        <div className={"playWrapper"}>
                            <Play/>
                        </div>
                        <FollowButton userFollow={song.user}/>
                    </div>
                    <div className={"popular"}>
                        <p>Popular tracks by</p>
                        <h2>{song.user?.username}</h2>
                        <div className="cardWrapper">
                            {topTrack.slice(0, 5).map((song, index) => (
                                <SongTable song={song} index={index}/>
                            ))}
                        </div>
                    </div>
                    <div className={"fromAlbum"}>
                        <img src={song.album?.banner} alt={"album image"}/>
                        <div>
                            <p>From the {song.album?.type}</p>
                            <h2>{song.album?.title}</h2>
                        </div>
                    </div>
                    <div className={"albumSong"}>
                        <div className="cardWrapper">
                            {albumSong.slice(0, 5).map((song, index) => (
                                <AlbumTable song={song} index={index}/>
                            ))}
                        </div>
                    </div>

                </Main>
                <RightSideBar/>
            </div>
            <ControlMusic/>
        </div>
    )
}