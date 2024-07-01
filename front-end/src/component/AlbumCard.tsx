import {Play} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";

export const AlbumCard = ({album} : {album : Album}) => {
    const navigate = useNavigate()

    const handlePlayClick = (e : MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
    };

    return(
        <div className={"card"} >
            <Link to={"/album/"+album.albumId}>
                <div className={"cardImage"}>
                    <img src={album.banner} alt={"placeholder"}/>
                    <span className={"play"} onClick={handlePlayClick}>
                        <Play/>
                    </span>
                </div>
                <div className={"cardContent"}>
                    <h3>{album.title}</h3>
                    <p>{album.release} - {album.type}</p>
                </div>
            </Link>
        </div>
    )
}