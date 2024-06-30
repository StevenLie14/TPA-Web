// import {useEffect} from "react";
import {SideBar} from "../component/SideBar.tsx";
import {Main} from "../component/Main.tsx";
import {RightSideBar} from "../component/RightSideBar.tsx";
import {ControlMusic} from "../component/ControlMusic.tsx";
import {useEffect, useState} from "react";
import {useAuth} from "../context/UseAuth.tsx";
import {AlbumSkeleton} from "../component/skeleton/AlbumSkeleton.tsx";

export const  HomePage = () => {
    const {user} = useAuth()
    //
    // useEffect(() => {
    //     // updateUser()
    //     // createUser()
    //     // getAllUser()
    //
    // },[])
    //
    // const createUser = () => {
    //     const met = {
    //         method: 'PUT', // Use POST or PUT
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             user_id:   "CU001",
    //             Username: "Steven Lie",
    //             Password: "1234",
    //             Email:    "steven@gmail.com"
    //         })
    //     };
    //     fetch("http://localhost:4000/user/create",met).then((res) => res.json()).then((data) => {console.log(data)})
    // }
    //
    // const getAllUser = () => {
    //     fetch("http://localhost:4000/user/get/1",).then((res) => res.json()).then((data) => {console.log(data)})
    // }
    //
    // const updateUser = () => {
    //     const met = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             user_id:   "CU001",
    //             Username: "Steven Lie Updated",
    //             Password: "",
    //             Email:    "steven@gmail.com"
    //         })
    //     };
    //     fetch("http://localhost:4000/user/update/2",met).then((res) => res.json()).then((data) => {console.log(data)})
    // }
    // const [data, setData] = useState()

    useEffect(() => {
        console.log(user);

        // axios.get("http://localhost:4000/playlist?id="+user?.user_id).then((res) => {
        //     // console.log(res)
        // }).catch((err) => {
        //     // console.log(err)
        // })

    },[user])

    const [page, setPage] = useState(2)

    useEffect(() => {
        console.log("Page", page)
    }, [page]);
    
    const handleScroll = () => {
        const { scrollTop, scrollHeight } = document.getElementById("content") as HTMLDivElement
        if (scrollTop + window.innerHeight >= scrollHeight) {
            setPage((prev) => prev + 1);
        }

    };

    useEffect(() => {
        document.getElementById("content")?.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);


    return(
        <div className={"outer"}>
            <div className={"App"}>
                <SideBar/>
                <Main setSearch={null}>
                    {Array(page).fill(0).map((_, index) => (
                        <div className="cardContainer" key={index}>
                            <h2>Focus</h2>
                            <div className="cardWrapper">
                                {/*<Card />*/}
                                <AlbumSkeleton />
                            </div>
                        </div>
                    ))}
                    {page}
                </Main>
                <RightSideBar/>
            </div>
            <ControlMusic/>
        </div>
    )
}