import {Link} from "react-router-dom";
import {House, LibraryBig, Plus, Search} from "lucide-react";
import {SidePlaylist} from "./SidePlaylist.tsx";
import {SideUser} from "./SideUser.tsx";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useAuth} from "../context/UseAuth.tsx";



export const SideBar = () => {

    const [playlist, setPlaylist] = useState<Playlist[]>([])
    const [following, setFollowing] = useState<Follow[]>([])

    const {user} = useAuth()
    useEffect(() => {
        if (user == null) return
        axios.get("http://localhost:4000/playlist?id="+user.user_id).then((res : AxiosResponse<WebResponse<Playlist[]>>) => {
            setPlaylist(res.data.data)
            // console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })

        axios.get("http://localhost:4000/get-following?id="+user.user_id).then((res: AxiosResponse<WebResponse<Follow[]>>) => {
            setFollowing(res.data.data)
            console.log("following")
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    },[user])

    return(
        <nav className={"navbar"}>
            <div className={"logo"}>
                <ul className={"homeSearch"}>
                    <li>
                        <House/>
                        <Link to={"/home"}
                              className={`link ${window.location.pathname === "/home" ? "active" : ""}`}>Home
                        </Link>
                    </li>
                    <li>
                        <Search/>
                        <Link to={"/search"}
                              className={`link ${window.location.pathname === "/search" ? "active" : ""}`}>Search
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={"library"}>
                <ul className={"libNav"}>
                    <li>
                        <div className={"leftLib"}>

                        <LibraryBig/>
                        <Link to={"/library"}
                              className={`link ${window.location.pathname === "/library" ? "active" : ""}`}>Your
                            Library
                        </Link>
                        </div>
                        <div className={"rightLib"}>
                            <Plus/>
                        </div>
                    </li>
                </ul>
                {
                    playlist.map((playlist) => (
                        <SidePlaylist playlist={playlist}/>
                    ))
                }
                {
                    following.map((follow) => (
                        follow.Following.role === "Artist" ?
                        <SideUser user={follow.Following}/>:
                            ""
                    ))
                }
            </div>
        </nav>
    )
}