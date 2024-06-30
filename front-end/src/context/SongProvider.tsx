import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";


interface IProps{
    song : Song
    changeSong : (songId : string) => void
    showDetail : string
    showDetailHandler : (type : string) => void
    track : string
    setSong : Dispatch<SetStateAction<Song>>
    setTrack : Dispatch<SetStateAction<string>>
    handlePlay : () => void,
    isPaused : boolean,
}

export const SongContext = createContext<IProps>({} as IProps)


export const SongProvider = ({children} : {children : ReactNode}) => {
    const [song,setSong] = useState<Song>({
        songId: "",
        userId: "",
        user: {
            user_id: "",
            avatar: "/assets/pp2.jpg",
            username : "a",
            email : "",
            gender : "",
            country : "",
            role : "",
            description : "",
        } as User,
        songAudio: new Audio("/assets/life hate us.mp3"),
        title : "",
        albumId : "",
        album : {} as Album,
        image : "/assets/life hate us.jpg",
        file : "/assets/life hate us.mp3",
        play : [],
        duration : 0,
        genre : "",
        releaseDate : new Date().toISOString()
    } as Song)

    const [isPaused, setIsPaused] = useState(song.songAudio.paused);

    useEffect(() => {
        axios.get("http://localhost:4000/song/get?id=1a6ddab1-0503-442a-999e-9de4bcfa34fe").then((res : AxiosResponse<WebResponse<Song>>) => {
            console.log(res.data)
            res.data.data.songAudio = new Audio(res.data.data.file);
            setSong(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, []);



    const handlePlay = () => {
        if (song.songAudio.paused) {
            setIsPaused(false);
            song.songAudio.play().catch((error) => {console.log(error)});
        } else {
            setIsPaused(true);
            song.songAudio.pause();
        }
    };

    const [track,setTrack] = useState<string>("")

    const [showDetail, setShowDetail] = useState<string>("")

    const showDetailHandler = (type : string) => {
        if (showDetail === type) {
            setShowDetail("")
        }else{
            setShowDetail(type)
        }

    }

    const changeSong = (songId : string) => {
        axios.get("http://localhost:4000/song/get?id="+songId).then((res : AxiosResponse<WebResponse<Song>>) => {
            console.log(res.data)
            setSong(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    const values : IProps = {
        setSong,song,changeSong,showDetail,showDetailHandler,track,setTrack,handlePlay,isPaused
    }

    return   (
        <SongContext.Provider value={values}>
            {children}
            </SongContext.Provider>

    )
}

