import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {SideBar} from "../component/SideBar.tsx";
import {Main} from "../component/Main.tsx";
import {Play} from "lucide-react";
import {AlbumTable} from "../component/AlbumTable.tsx";
import {RightSideBar} from "../component/RightSideBar.tsx";
import {ControlMusic} from "../component/ControlMusic.tsx";
import {AlbumCard} from "../component/AlbumCard.tsx";

export const AlbumPage = () => {

    const {id} = useParams<string>()
    const [album,setAlbum] = useState<Album>({} as Album)
    const [duration,setDuration] = useState<number>(0)
    const [albumSong, setAlbumSong] = useState<Song[]>([])
    const [moreAlbum, setMoreAlbum] = useState<Album[]>([])

    useEffect(() => {
        axios.get("http://localhost:4000/song/get-by-album?id="+id).then((res : AxiosResponse<WebResponse<Song[]>>) => {
            setAlbumSong(res.data.data)
            console.log(res.data.data)
            const albums = res.data.data[0].album
            albums.User = res.data.data[0].user
            setAlbum(albums)
            let minute = 0;
            res.data.data.map((song) => {minute += song.duration})
            setDuration(minute)

            axios.get("http://localhost:4000/album/get-artist?id="+albums.userId).then((res : AxiosResponse<WebResponse<Album[]>>) => {
                setMoreAlbum(res.data.data)
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
                            <img className={"song"} src={album.banner} alt={"avatar"}/>
                        </div>
                        <div>
                            <p>Song</p>
                            <h1>{album.title}</h1>
                            <div className={"songDescription"}>
                                <img src={album.User?.avatar}
                                     alt={"avatar"}/> - {album.User?.username} - {album?.release} - {Math.floor(duration / 60)} min {Math.floor(duration % 60).toString().padStart(2, '0')} sec
                            </div>
                        </div>
                    </div>
                    <div className={"artistPlay"}>
                        <div className={"playWrapper"}>
                            <Play/>
                        </div>
                        {/*<FollowButton userFollow={song.user}/>*/}
                    </div>
                    <div className={"albumSong"}>
                        <div className="cardWrapper">
                            <div className={"albumTable"}>
                                <div className={"title"}>
                                    <h3>#</h3>
                                    <p className={"head"}>Title</p>
                                </div>
                                <p>a</p>
                            </div>
                            <hr/>
                        </div>
                        <div className="cardWrapper">
                            {albumSong.slice(0, 5).map((song, index) => (
                                <AlbumTable song={song} index={index}/>
                            ))}
                        </div>
                    </div>
                    {moreAlbum && moreAlbum.length > 0 && (<div className="cardContainer">
                            <div className={"cardTitle"}>
                                <h2>Discography</h2>
                                <Link to={"/more/"}>See discography</Link>
                            </div>
                            <div className="cardWrapper">
                                {moreAlbum.slice(0,5).map((album) => (
                                    <AlbumCard album={album}/>
                                ))}
                            </div>
                        </div>
                    )}


                </Main>
                <RightSideBar/>
            </div>
            <ControlMusic/>
        </div>
    )

}