// import {useEffect} from "react";
// import {useAuth} from "../context/AuthProvider.tsx";
import {SideBar} from "../component/SideBar.tsx";
import {Main} from "../component/Main.tsx";

export const  HomePage = () => {
    // const {user} = useAuth()
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
    return(
        <div className={"outer"}>
            <div className={"App"}>
                <SideBar/>
                <Main/>
            </div>
            <div className={"musicControl"}>Music Controls</div>
        </div>
    )
}