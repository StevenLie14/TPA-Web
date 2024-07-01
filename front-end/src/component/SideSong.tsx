import {Play, Trash2} from "lucide-react";
import {useSong} from "../context/UseSong.tsx";

export const SideSong = ({songs,trash} : {songs : Song,trash :boolean}) => {
    const {setSong,handlePlay,song} = useSong();

    const changeSong = () => {
        if (song === songs) return;
        setSong(song);
        handlePlay();
    }

    return (
        <div className="sideSong">
            <div className={"albumPic"} onClick={changeSong}>
                {song != songs && <Play/>}
                <img src={songs?.image} alt={songs?.title} className="albumPic"/>
            </div>
            <div className="song-details">
                <h3 className="song-title">{songs?.title}</h3>
                <p className="artist-name">{songs?.artist?.user?.username}</p>
            </div>
            <div className={"trash"}>
                {trash && <Trash2/>}
            </div>
        </div>
    )
}