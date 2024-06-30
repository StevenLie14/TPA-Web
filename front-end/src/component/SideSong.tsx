import {Play, Trash2} from "lucide-react";
import {useSong} from "../context/UseSong.tsx";

export const SideSong = ({song,trash} : {song : Song,trash :boolean}) => {
    const {setSong,handlePlay} = useSong();

    const changeSong = () => {
        setSong(song);
        handlePlay();
    }

    return (
        <div className="sideSong">
            <div className={"albumPic"} onClick={changeSong}>
                <Play/>
                <img src={song.songImage} alt={song.songTitle} className="albumPic"/>
            </div>
            <div className="song-details">
                <h3 className="song-title">{song.songTitle}</h3>
                <p className="artist-name">{song.User?.username}</p>
            </div>
            <div className={"trash"}>
                {trash && <Trash2/>}
            </div>
        </div>
    )
}