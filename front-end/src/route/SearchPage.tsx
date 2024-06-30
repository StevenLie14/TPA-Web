import {SideBar} from "../component/SideBar.tsx";
import {Main} from "../component/Main.tsx";
import {RightSideBar} from "../component/RightSideBar.tsx";
import {ControlMusic} from "../component/ControlMusic.tsx";
import {useEffect, useState} from "react";
import {AlbumSkeleton} from "../component/skeleton/AlbumSkeleton.tsx";
import {useDebounce} from "../hooks/hooks.ts";

export const SearchPage = () => {

    // const notifyUser = () => {
    //     if (!("Notification" in window)) {
    //         alert("This browser does not support desktop notification");
    //     } else if (Notification.permission === "granted") {
    //         new Notification("You have a new message");
    //
    //     }else if (Notification.permission !== "denied") {
    //         Notification.requestPermission().then(function (permission) {
    //             if (permission === "granted") {
    //                 new Notification("You have a new message");
    //             }
    //         });
    //     }
    // }

    const [search, setSearch] = useState<string>("")
    const [debounce] = useDebounce(search)

    useEffect(() => {

    },[debounce])



    return(
        <div className={"outer"}>
            <div className={"App"}>
                <SideBar/>
                <Main setSearch={setSearch}>
                    <div className="cardContainer">
                        <h2>Focus</h2>
                        <div className="cardWrapper">
                            {/*<Card />*/}
                            <AlbumSkeleton />
                        </div>
                    </div>
                </Main>
                <RightSideBar/>
            </div>
            <ControlMusic/>
        </div>
    )
}