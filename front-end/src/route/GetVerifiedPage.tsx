import {useAuth} from "../context/UseAuth.tsx";
import {useEffect, useState} from "react";
import * as React from "react";
import axios from "axios";
import ErrorModal from "../component/ErrorModal.tsx";
import {Navbar} from "../component/Navbar.tsx";
import {Link} from "react-router-dom";
import {BoxSelect, Camera, ChevronLeft} from "lucide-react";
import {Footer} from "../component/Footer.tsx";

export const GetVerifiedPage = () => {
    const {user} = useAuth()

    const [error, setError] = useState<string>("")
    const[editProps, setEditProps] = useState<EditProps>({} as EditProps)

    const onChangeInput = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditProps({...editProps,[e.target.name]: e.target.value})
        console.log(editProps)
    }

    const onEdit = () => {
        if (user == null) return

        axios.post("http://localhost:4000/user/edit-prof",{
            userId : user.user_id,
            country : editProps.country,
            dob : new Date(editProps.dob),
            gender : editProps.gender
        }).then((res) => {
            console.log(res)
        })
    }

    useEffect(() => {
        if (user == null) return
        setEditProps({...editProps, userId: user.user_id,dob: user.dob,country: user.country,gender:user.gender})
    }, [user]);

    return(
        <div className={"wrapper"}>
            {error && <ErrorModal error={error} setError={setError}/>}
            <Navbar/>
            <div className="container">
                <div className={"loginBox"}>
                    <div className={"editProfileTitle"}>
                        <Link to={""}><ChevronLeft/></Link>
                        <h1>Get Verified</h1>
                        <p>User ID</p>
                        <p>{user?.user_id}</p>
                    </div>
                    <div className={"inputVerify"}>

                        <label htmlFor="image">
                            <div className={"uploadImage"}>
                                <div className={"camera"}>
                                    <Camera/>
                                    Upload Banner Image
                                    <input type={"file"} id={"image"}/>
                                </div>
                                    <BoxSelect className={"boxSelect"}/>
                            </div>
                        </label>
                        <div className={"verify"}>
                            <div className={"role"}>
                                <p>Current Role</p>
                                <h6>{user?.role}</h6>
                            </div>
                            <div className={"areaAbout"}>
                                <label htmlFor="about">About You</label>
                                <textarea id="about" name="about" onChange={onChangeInput}/>
                            </div>
                            <div className={"saveButton"}>
                                <Link to={""}>Cancel</Link>
                                <button className={"loginButton"} onClick={onEdit}>Get Verified</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}