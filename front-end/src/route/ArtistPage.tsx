import {SideBar} from "../component/SideBar.tsx";
import {Main} from "../component/Main.tsx";
import {RightSideBar} from "../component/RightSideBar.tsx";
import {ControlMusic} from "../component/ControlMusic.tsx";
import {useAuth} from "../context/UseAuth.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {Play} from "lucide-react";
import {SongTable} from "../component/SongTable.tsx";
import {FollowButton} from "../component/FollowButton.tsx";
import {AlbumCard} from "../component/AlbumCard.tsx";
import {Card} from "../component/Card.tsx";

export const ArtistPage = () => {

    const {user} = useAuth()
    const {id} = useParams<{id: string}>()
    const [userProfile, setUserProfile] = useState<User>({} as User)
    const [playlist,setPlaylist] = useState<Playlist[]>([])
    const [filteredAlbum, setFilteredAlbum] = useState<Album[]>([])
    const [song,setSong] = useState<Song[]>([])
    const [album, setAlbum] = useState<Album[]>([])
    const [typeFilter, setType] = useState("all")

    const handleFilter = (type : string) => {
        if (type === typeFilter) {
            setType("all")
        }else if (type === "single") {
            setType("single")
            setFilteredAlbum(album.filter((album) => album.type === "Single"))
        }else if (type === "album") {
            setType("album")
            setFilteredAlbum(album.filter((album) => album.type === "Album"))
        }else if(type === "ep") {
            setType("ep")
            setFilteredAlbum(album.filter((album) => album.type === "EPs"))
        }
    }

    useEffect(() => {
        if (typeFilter === "all") {
            setFilteredAlbum(album)
        }else if (typeFilter === "single") {
            setFilteredAlbum(album.filter((album) => album.type === "Single"))
        }else if (typeFilter === "album") {
            setFilteredAlbum(album.filter((album) => album.type === "Album"))
        }else if(typeFilter === "ep") {
            setFilteredAlbum(album.filter((album) => album.type === "EPs"))
        }
    }, [typeFilter,album]);

    useEffect(() => {
        if (user == null) return

        axios.get("http://localhost:4000/user/get?id="+id).then((res : AxiosResponse<WebResponse<User>>) => {
            setUserProfile(res.data.data)
        }).catch((err) => {
            console.log(err)
        })

        axios.get("http://localhost:4000/song/get-by-artist?id="+id).then((res : AxiosResponse<WebResponse<Song[]>> ) => {
            setSong(res.data.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })

        axios.get("http://localhost:4000/playlist?id="+user.user_id).then((res : AxiosResponse<WebResponse<Playlist[]>> ) => {
            const playlist =  res.data.data.filter((playlist) =>
                    playlist.PlaylistDetails.find((detail) => detail.song.user.user_id !== id)
                )
            setPlaylist(playlist)
        }).catch((err) => {
            console.log(err)
        })

        axios.get("http://localhost:4000/album/get-artist?id="+id).then((res : AxiosResponse<WebResponse<Album[]>>) => {
            setAlbum(res.data.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
        // 250020ec-3ff6-4e0a-9a04-94e3c25df7a7
    },[id, user])

    console.log(song)
    return(
        <div className={"outer"}>
            <div className={"App"}>
                <SideBar/>

                <Main setSearch={null}>
                    <div className={"profileHeader"}>
                        <div>
                            <img src={userProfile.avatar} alt={"avatar"}/>
                        </div>
                        <div>
                            <p>Profile</p>
                            <h1>{userProfile.username}</h1>
                        </div>
                    </div >
                    <div className={"artistPlay"}>
                        <div className={"playWrapper"}>
                            <Play/>
                        </div>
                        <FollowButton userFollow={userProfile}/>
                    </div>
                    <div className={"popular"}>
                        <h2>Popular</h2>
                        <div className="cardWrapper">
                            {song.slice(0,5).map((song,index) => (
                                <SongTable song={song} index={index}/>
                            ))}
                        </div>
                    </div>
                    {album && album.length > 0 && (<div className="cardContainer">
                        <div className={"cardTitle"}>
                            <h2>Discography</h2>
                            <Link to={"/more/"}>Show More..</Link>
                        </div>
                        <div className={"filter"}>
                            <button className={`${typeFilter == "single" ? "active" : ""}`} onClick={() => handleFilter("single")}>Single</button>
                            <button className={`${typeFilter == "album" ? "active" : ""}`} onClick={() => handleFilter("album")}>Album</button>
                            <button className={`${typeFilter == "ep" ? "active" : ""}`} onClick={() => handleFilter("ep")}>EPs</button>
                        </div>
                            <div className="cardWrapper">
                                {filteredAlbum.slice(0,5).map((album) => (
                                        <AlbumCard album={album}/>
                                ))}
                            </div>
                    </div>
                    )}

                    {playlist && playlist.length > 0 && (<div className="cardContainer">
                        <div className={"cardTitle"}>
                            <h2>Featured Playlists</h2>
                            <Link to={"/more/"}>Show More..</Link>
                        </div>
                        {playlist.slice(0,5).map((play, index) => (
                                <div className="cardWrapper" key={index}>
                                    <Card playlist={play} />
                                </div>
                            ))}
                    </div>)}

                </Main>
                <RightSideBar/>
            </div>
            <ControlMusic/>
        </div>
    )
}