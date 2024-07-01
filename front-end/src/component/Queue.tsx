import {X} from "lucide-react";
import {SideSong} from "./SideSong.tsx";
import {useSong} from "../context/UseSong.tsx";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

export const Queue = () => {
    const { showDetailHandler, song, track } = useSong();
    const [nowPlaying,setNowPlaying] = useState<Song>({} as Song)
    const [queue,setQueue] = useState<Song[]>([])
    useEffect(() => {
        axios.get("http://localhost:4000/queue/get-all",).then((res : AxiosResponse<WebResponse<Song[]>>) => {
            console.log(res)
            setQueue(res.data.data)
            setNowPlaying(res.data.data[0])
        }).catch((err) => {
            console.log(err)
        })
    }, []);
    return (
        <>
            <div className="rightSideBarHeader">
                <h3>{track ? track : song.title}</h3>
                <X onClick={() => showDetailHandler("")}/>
            </div>
            {nowPlaying &&  (
            <div className="queue">
                <div className="header">
                    <h3>Now playing</h3>
                    <button>Open queue</button>
                </div>
                <SideSong song={nowPlaying} trash={true}/>
            </div>
            )}
            <div className="queue">
                <div className="header">
                    <h3>Next in queue</h3>
                </div>
                {
                    queue && queue.slice(1,queue.length).map((song) => {
                        return <SideSong song={song} trash={true}/>
                    })
                }
            </div>
        </>
    )
}