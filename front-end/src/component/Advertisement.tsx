import {BadgeCheck, ChevronRight, X} from "lucide-react";
import {useSong} from "../context/UseSong.tsx";

export const Advertisement = () => {
    const { showDetailHandler} = useSong();
    return (
        <>
            <div className="rightSideBarHeader">
                <h4>Your music will continue after the break</h4>
                <X onClick={() => showDetailHandler("")}/>
            </div>
            <div className="trackImage">
                <img src={"./assets/spotify-prem.png"} alt="Song Cover"/>
            </div>
            <div className="songTitle">
                <div>
                    <h3>Spotify</h3>
                    <p>Advertisement</p>
                </div>
                <div>
                    <BadgeCheck/>
                </div>
            </div>
            <div className={"learnMore"}>
                <h3>Learn More</h3>
                <ChevronRight/>
            </div>
        </>
    )
}