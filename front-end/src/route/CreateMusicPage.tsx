import {useAuth} from "../context/UseAuth.tsx";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {SideBar} from "../component/SideBar.tsx";
import {Main} from "../component/Main.tsx";
import {Link} from "react-router-dom";
import {BoxSelect, Camera, Minus, Music, Plus} from "lucide-react";
import {RightSideBar} from "../component/RightSideBar.tsx";
import {ControlMusic} from "../component/ControlMusic.tsx";

export const CreateMusicPage = () => {
    const {user} = useAuth()
    const [track,setTrack] = useState<number>(1)

    const handleAddTrack = () => {
        setTrack(t => t + 1)
    }

    const handleRemoveTrack = () => {
        if (track === 1) return
        setTrack(t => t - 1)
    }

    return (
        <div className={"outer"}>
            <div className={"App"}>
                <SideBar/>

                <Main setSearch={null}>
                    <div className="profileHeader">

                        <div>
                            <h1>Create New Music</h1>
                        </div>
                    </div>
                    <div className="newMusicContainer">
                            <div className={"uploadImage"}>
                                <div className={"camera"}>
                                    <Camera/>
                                    Upload Banner Image
                                    <input type={"file"} id={"image"}/>
                                </div>
                        <label htmlFor="image">
                                <BoxSelect className={"boxSelect"}/>
                        </label>
                            </div>
                        <div className={"trackContainer"}>
                            <div className={"albumTrackTitle"}>
                                <div className={"titleContainer"}>
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className={"inputText"} id="title" name="title"/>
                                </div>
                                <div className={"collectionContainer"}>
                                    <label htmlFor="album">Collection Type</label>
                                    <select name="album" id="album" disabled={true}>
                                        <option value="Single" selected={track >= 1 && track <= 3} >Singles</option>
                                        <option value="Eps" selected={track >= 4 && track <= 6} >Eps</option>
                                        <option value="Albums" selected={track > 6} >Albums</option>
                                    </select>
                                </div>
                            </div>
                            <h6>Tracks</h6>
                            <div className={"trackList"}>
                                {[...Array(track)].map((_, index) => (
                                    <div className={"track"}>
                                        <div>
                                            <label htmlFor="track">#{index + 1}. </label>
                                            <input type="text" className={"inputText"} id="track" name="track"
                                                   placeholder={"Name of track"}/>
                                        </div>
                                        <label htmlFor="trackFile">
                                            <div className={"uploadSong"}>
                                                <p>Upload MP3</p>
                                                <Music/>
                                            </div>
                                            <input type="file" id="trackFile" name="trackFile"/>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={"plusMinus"}>
                        <div className={"logoWrapper"} onClick={handleAddTrack}>
                            <Plus/>
                        </div>
                        <div className={"logoWrapper"} onClick={handleRemoveTrack}>
                            <Minus/>
                        </div>
                    </div>
                    <div className={"saveButton"}>
                        <Link to={""}>Cancel</Link>
                        <button className={"createMusic"}>Post Music</button>
                    </div>
                </Main>
                <RightSideBar/>
            </div>
            <ControlMusic/>
        </div>
    )
}