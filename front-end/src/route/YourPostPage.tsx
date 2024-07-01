import {SideBar} from "../component/SideBar.tsx";
import {Main} from "../component/Main.tsx";
import {Link} from "react-router-dom";
import {RightSideBar} from "../component/RightSideBar.tsx";
import {ControlMusic} from "../component/ControlMusic.tsx";
import {useAuth} from "../context/UseAuth.tsx";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {AlbumCard} from "../component/AlbumCard.tsx";
import {Plus} from "lucide-react";

export const YourPostPage = () => {
    const {user} = useAuth()
    const [albums,setAlbum] = useState<Album[]>([])
    useEffect(() => {
        if (user == null) return
        axios.get("http://localhost:4000/album/get-artist?id="+user?.user_id).then((res : AxiosResponse<WebResponse<Album[]>>) => {
            setAlbum(res.data.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [user]);
    return (
        <div className={"outer"}>
            <div className={"App"}>
                <SideBar/>

                <Main setSearch={null}>
                    <div className="profileHeader">
                        <div>
                            <img src={user?.avatar} alt={"avatar"}/>
                        </div>
                        <div>
                            <p>Profile</p>
                            <h1>{user?.username}</h1>
                            {/*<h6>{playlist.length} Public Playlists - {follower.length} Followers*/}
                            {/*    - {following.length} Following</h6>*/}
                        </div>
                    </div>
                    {albums && albums.length > 0 && (<div className="cardContainer">
                            <div className={"cardTitle"}>
                                <h2>Discography</h2>
                                <Link to={"/more/"}>See discography</Link>
                            </div>
                            <div className="cardWrapper">
                                <div className={"card"}>
                                    <div className={"plusImage"}>
                                        <Plus/>
                                    </div>
                                    <div className={"cardContent"}>
                                    </div>
                                </div>
                                {albums.slice(0, 5).map((album) => (
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