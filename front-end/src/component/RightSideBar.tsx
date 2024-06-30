import { BadgeCheck, X } from "lucide-react";
import { SideSong } from "./SideSong.tsx";
import { useSong } from "../context/UseSong.tsx";
import { Queue } from "./Queue.tsx";
import {Advertisement} from "./Advertisement.tsx";
import {FollowButton} from "./FollowButton.tsx";

export const RightSideBar = () => {
    const { showDetail, showDetailHandler, song, track } = useSong();

    return (
        <>
            {showDetail && (
                <div className="rightSideBar">
                    {showDetail === "detail" ? (
                        <>
                            <div className="rightSideBarHeader">
                                <h3>{track ? track : song.title}</h3>
                                <X onClick={() => showDetailHandler("")} />
                            </div>
                            <div className="trackImage">
                                <img src={song.image} alt="Song Cover" />
                            </div>
                            <div className="songTitle">
                                <div>
                                    <h3>{song.title}</h3>
                                    <p>{song.user.username}</p>
                                </div>
                                <div>
                                    <BadgeCheck />
                                </div>
                            </div>
                            <div className="aboutArtist">
                                <div className="header">
                                    <h3>About the Artist</h3>
                                    <img src={song.user?.avatar} alt="Artist Avatar" />
                                </div>
                                <div className="aboutContent">
                                    <h3>{song.user?.username}</h3>
                                    <div className="description">
                                        <p>2127833218 monthly listeners</p>
                                        <FollowButton userFollow={song.user}/>
                                    </div>
                                    <p>{song.user?.description}</p>
                                </div>
                            </div>
                            <div className="queue">
                                <div className="header">
                                    <h3>Next in queue</h3>
                                    <button onClick={() => showDetailHandler("advertise")}>Open queue</button>
                                </div>
                                <SideSong song={song} trash={false} />
                            </div>
                        </>
                    ) : showDetail === "advertise" ? (
                        <Advertisement />
                    ) : (
                        <Queue />
                    )}
                </div>
            )}
        </>
    );
};
