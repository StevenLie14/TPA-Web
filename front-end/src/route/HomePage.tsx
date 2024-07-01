// import {useEffect} from "react";
import {SideBar} from "../component/SideBar.tsx";
import {Main} from "../component/Main.tsx";
import {RightSideBar} from "../component/RightSideBar.tsx";
import {ControlMusic} from "../component/ControlMusic.tsx";
import React, {useEffect, useState} from "react";
import {useAuth} from "../context/UseAuth.tsx";
import {AlbumSkeleton} from "../component/skeleton/AlbumSkeleton.tsx";
import {AudioLines, Play} from "lucide-react";
import axios, {AxiosResponse} from "axios";
import {useSong} from "../context/UseSong.tsx";
import {AlbumCard} from "../component/AlbumCard.tsx";
import {Link, useNavigate} from "react-router-dom";

export const  HomePage = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    const {song} = useSong()
    const [gallery, setGallery] = useState<Play[]>([])
    const [recommendation, setRecommendation] = useState<Album[]>([])
    const [isLoad,setIsLoad] = useState<boolean>(false)

    // useEffect(() => {
    //     // updateUser()
    //     // createUser()
    //     // getAllUser()
    //
    // },[])
    //
    // const createUser = () => {
    //     const met = {
    //         method: 'PUT', // Use POST or PUT
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             user_id:   "CU001",
    //             Username: "Steven Lie",
    //             Password: "1234",
    //             Email:    "steven@gmail.com"
    //         })
    //     };
    //     fetch("http://localhost:4000/user/create",met).then((res) => res.json()).then((data) => {console.log(data)})
    // }
    //
    // const getAllUser = () => {
    //     fetch("http://localhost:4000/user/get/1",).then((res) => res.json()).then((data) => {console.log(data)})
    // }
    //
    // const updateUser = () => {
    //     const met = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             user_id:   "CU001",
    //             Username: "Steven Lie Updated",
    //             Password: "",
    //             Email:    "steven@gmail.com"
    //         })
    //     };
    //     fetch("http://localhost:4000/user/update/2",met).then((res) => res.json()).then((data) => {console.log(data)})
    // }
    // const [data, setData] = useState()

    useEffect(() => {
        console.log(user);

        // axios.get("http://localhost:4000/playlist?id="+user?.user_id).then((res) => {
        //     // console.log(res)
        // }).catch((err) => {
        //     // console.log(err)
        // })

    },[user])

    const [page, setPage] = useState(2)

    useEffect(() => {
        const fetchRecommendations = () => {
            setIsLoad(true)
            setTimeout(() => {
                axios.get("http://localhost:4000/album/get-random").then((res: AxiosResponse<WebResponse<Album[]>>) => {
                    setRecommendation(prev => [...prev, ...res.data.data])
                    setIsLoad(false)
                }).catch((err) => {
                    console.log(err)
                })
            }, 1000)
        }
        fetchRecommendations()
    }, [page]);

    const handleScroll = () => {
        const content = document.getElementById("content") as HTMLDivElement;
        if (!content) return;

        const { scrollTop, scrollHeight, clientHeight } = content;
        if (scrollTop + clientHeight +1 >= scrollHeight) {
            setPage((prev) => prev + 5);
        }
    };

    useEffect(() => {
        document.getElementById("content")?.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        if(!user) return
        axios.get("http://localhost:4000/play/get-last?id="+user?.user_id).then((res : AxiosResponse<WebResponse<Play[]>>) => {
            setGallery(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [user]);

    const handlePlayClick = (e : React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
    };


    return(
        <div className={"outer"}>
            <div className={"App"}>
                <SideBar/>
                <Main setSearch={null}>
                    <div className={"gallery"}>
                        <div className={"galleryContainer"}>
                            {gallery &&
                                gallery.map((play) => (
                                    <div className={"galleryCard"} key={play.playId} onClick={() => navigate("/track/"+ play.songId)}>
                                            <div className={"gallerySong"}>
                                                <img src={play.song.image} alt={"gallery"}/>
                                                <h5>{play.song.title}</h5>
                                            </div>
                                        {play.song == song ? <AudioLines/> :
                                            (
                                                <div className={"play"} onClick={handlePlayClick}>
                                                    <Play/>
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="cardContainer" key={song.album?.albumId}>
                        <h2>Recently Played</h2>
                        <div className="cardWrapper">
                            {gallery && gallery.length > 0 &&
                                gallery.map((play) => (
                                    <AlbumCard album={play.song.album}/>
                                ))
                            }
                        </div>
                    </div>

                    <div className="cardContainer">
                        <h2>Recommendation</h2>
                        <div className="cardWrapper">
                            {gallery && gallery.length > 0 &&
                                recommendation.map((album) => (
                                    album?<AlbumCard album={album}/>:<AlbumSkeleton/>
                                ))
                            }
                        </div>
                    </div>
                    <div className="cardContainer">
                        <div className="cardWrapper">
                        {isLoad && Array(5).fill(0).map(() => (
                                <AlbumSkeleton/>
                        ))}
                        </div>
                    </div>
                    {/*{page}*/}
                </Main>
                <RightSideBar/>
            </div>
            <ControlMusic/>
        </div>
    )
}