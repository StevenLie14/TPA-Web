import {SideBar} from "../component/SideBar.tsx";
import {Main} from "../component/Main.tsx";
import {Card} from "../component/Card.tsx";
import {RightSideBar} from "../component/RightSideBar.tsx";
import {ControlMusic} from "../component/ControlMusic.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ProfileCard} from "../component/ProfileCard.tsx";
import axios, {AxiosResponse} from "axios";
import {useAuth} from "../context/UseAuth.tsx";

export const ProfilePage = () => {
    const {user} = useAuth()
    const {id} = useParams<{id: string}>()
    const [userProfile, setUserProfile] = useState<User>({} as User)
    const [follower, setFollower] = useState<Follow[]>([])
    const [mutual, setMutual] = useState<Follow[]>([])
    const [following, setFollowing] = useState<Follow[]>([])
    const [playlist, setPlaylist] = useState<Playlist[]>([])

    useEffect(() => {
        if (user == null) return

        axios.get("http://localhost:4000/user/get?id="+id).then((res) => {
            setUserProfile(res.data.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })

        axios.get("http://localhost:4000/playlist?id="+id).then((res : AxiosResponse<WebResponse<Playlist[]>>) => {
            setPlaylist(res.data.data)
            // console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })

        axios.get("http://localhost:4000/get-following?id="+id).then((res: AxiosResponse<WebResponse<Follow[]>>) => {
            setFollowing(res.data.data)
            console.log("following")
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })

        axios.get("http://localhost:4000/get-follower?id="+id).then((res: AxiosResponse<WebResponse<Follow[]>>) => {
            setFollower(res.data.data)
            console.log("following")
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })

        axios.get("http://localhost:4000/get-mutual?id="+id).then((res: AxiosResponse<WebResponse<Follow[]>>) => {
            setMutual(res.data.data)
            console.log("following")
            console.log(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    },[id, user])



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
                            <h6>{playlist.length} Public Playlists - {follower.length} Followers
                                - {following.length} Following</h6>
                        </div>
                    </div>
                    {playlist && playlist.length > 0 && (<div className="cardContainer">
                        <div className={"cardTitle"}>
                            <h2>Public Playlists</h2>
                            <Link to={"/more/"}>Show More..</Link>
                        </div>
                        {playlist.slice(0,5).map((play, index) => (
                            <div className="cardWrapper" key={index}>
                                <Card playlist={play}/>
                            </div>
                        ))}
                    </div>)}
                    {follower && follower.length > 0 && (<div className="cardContainer">
                        <div className={"cardTitle"}>
                            <h2>Followers</h2>
                            <Link to={"/more/"}>Show More..</Link>
                        </div>
                        {
                            follower.slice(0,5).map((follow, index) => (
                                <div className="cardWrapper" key={index}>
                                <ProfileCard user={follow.Follower} key={follow.Follower.user_id}/>
                            </div>
                            ))
                        }
                    </div>)}
                    {following && following.length > 0 && (<div className="cardContainer">
                        <div className={"cardTitle"}>
                            <h2>Following</h2>
                            <Link to={"/more/"}>Show More..</Link>
                        </div>
                        {
                            following.slice(0,5).map((follow, index) => (
                                <div className="cardWrapper" key={index}>
                                <ProfileCard user={follow.Following} key={follow.Following.user_id}/>
                                </div>
                            ))
                        }
                    </div>)}
                    {mutual && mutual.length > 0 && (<div className="cardContainer">
                        <div className={"cardTitle"}>
                            <h2>Mutual</h2>
                            <Link to={"/more/"}>Show More..</Link>
                        </div>
                        {
                            mutual.slice(0,5).map((follow, index) => (
                                <div className="cardWrapper" key={index}>
                                <ProfileCard user={follow.Follower} key={follow.Follower.user_id}/>
                                </div>
                            ))
                        }
                    </div>)}

                </Main>
                <RightSideBar/>
            </div>
            <ControlMusic/>
        </div>
    )
}