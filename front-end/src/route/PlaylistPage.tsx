import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {SideBar} from "../component/SideBar.tsx";
import {Main} from "../component/Main.tsx";
import {Clock, Play} from "lucide-react";
import {RightSideBar} from "../component/RightSideBar.tsx";
import {ControlMusic} from "../component/ControlMusic.tsx";
import {PlaylistTable} from "../component/PlaylistTable.tsx";

export const PlaylistPage = () => {
    const {id} = useParams<string>()
    const [playlist,setPlaylist] = useState<Playlist>({} as Playlist)
    const [duration,setDuration] = useState<number>(0)

    useEffect(() => {
        axios.get("http://localhost:4000/playlist-id?id="+id).then((res : AxiosResponse<WebResponse<Playlist>>) => {
            const playlist = res.data.data
            console.log(res.data.data)
            setPlaylist(playlist)

            let minute = 0;
            playlist.PlaylistDetails.map((detail) => {
                minute += detail.song.duration
            })
            setDuration(minute)
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
                            <img className={"song"} src={playlist.Image} alt={"avatar"}/>
                        </div>
                        <div>
                            <p>Playlist</p>
                            <h1>{playlist.Title}</h1>
                            <p>{playlist.Description}</p>
                            <div className={"songDescription"}>
                                <img src={playlist.User?.avatar}
                                     alt={"avatar"}/> - {playlist.User?.username} - {playlist.PlaylistDetails?.length} songs - {Math.floor(duration / 60)} min {Math.floor(duration % 60).toString().padStart(2, '0')} sec
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
                            <div className={"playlistTable"}>
                                <div className={"title"}>
                                    <h3>#</h3>
                                    <p className={"head"}>Title</p>
                                </div>
                                <p>Album</p>
                                <p>Date added</p>
                                <Clock/>
                            </div>
                            <hr/>
                        </div>
                        <div className="cardWrapper">
                            {playlist.PlaylistDetails?.map((detail, index) => (
                                <PlaylistTable detail={detail} index={index}/>
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