import {X} from "lucide-react";
import {SideSong} from "./SideSong.tsx";
import {useSong} from "../context/UseSong.tsx";

export const Queue = () => {
    const { showDetailHandler, song, track } = useSong();
    return (
        <>
            <div className="rightSideBarHeader">
                <h3>{track ? track : song.title}</h3>
                <X onClick={() => showDetailHandler("")}/>
            </div>
            <div className="queue">
                <div className="header">
                    <h3>Now playing</h3>
                    <button>Open queue</button>
                </div>
                <SideSong song={song} trash={true}/>
            </div>
            <div className="queue">
                <div className="header">
                    <h3>Next in queue</h3>
                </div>
                    <SideSong song={song} trash={true}/>
            </div>
        </>
    )
}