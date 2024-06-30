import {Play} from "lucide-react";

export const Card = ({playlist} : {playlist : Playlist}) => {
    return(
        <div className={"card"}>
            <div className={"cardImage"}>
                <img src={playlist.Image} alt={"placeholder"}/>
                <span className={"play"}>
                    <Play/>
                </span>
            </div>
            <div className={"cardContent"}>
                <h3>{playlist.Title}</h3>
                <p>{playlist.User.username}</p>
            </div>
        </div>
    )
}