import {useAuth} from "../context/UseAuth.tsx";
import {useEffect, useState} from "react";
import * as React from "react";
import axios from "axios";
import ErrorModal from "../component/ErrorModal.tsx";
import {Navbar} from "../component/Navbar.tsx";
import {Check, X} from "lucide-react";
import {Footer} from "../component/Footer.tsx";

export const ArtistVerificationPage = () => {
    const {user} = useAuth()

    const [error, setError] = useState<string>("")
    const[editProps, setEditProps] = useState<EditProps>({} as EditProps)

    const onChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
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
                <div className={"adminContainer"}>
                    <div className={"adminBox"}>
                        <div className={"editProfileTitle"}>
                            <h1>Admin Page</h1>
                            <p>Verify Artist</p>
                        </div>
                        <div className={"verifyContainer"}>
                            <div className={"left"}>
                                <div>
                                    <img src={"/assets/yume to hazakura.jpg"} alt={"art"}/>
                                </div>
                                <div className={"userContent"}>
                                    <h6>jerrrr</h6>
                                    <p>1K Follower - 25 Following</p>
                                </div>
                            </div>
                            <div className={"right"}>
                                <div>
                                    <Check className={"check"}/>
                                </div>
                                <div>
                                    <X className={"x"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}