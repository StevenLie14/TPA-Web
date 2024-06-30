import {Play} from "lucide-react";

export const AlbumCard = ({album} : {album : Album}) => {
    return(
        <div className={"card"}>
            <div className={"cardImage"}>
                <img src={album.banner} alt={"placeholder"}/>
                <span className={"play"}>
                    <Play/>
                </span>
            </div>
            <div className={"cardContent"}>
                <h3>{album.title}</h3>
                <p>{album.release} - {album.type}</p>
            </div>
        </div>
    )
}