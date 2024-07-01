import ErrorModal from "../component/ErrorModal.tsx";
import {Navbar} from "../component/Navbar.tsx";
import {Link} from "react-router-dom";
import {Footer} from "../component/Footer.tsx";
import {useEffect, useState} from "react";
import * as React from "react";
import {ChevronLeft} from "lucide-react";
import {useAuth} from "../context/UseAuth.tsx";
import axios from "axios";

export const EditProfilePage = () => {

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
                <div className={"loginBox"}>
                    <div className={"editProfileTitle"}>
                        <Link to={""}><ChevronLeft/></Link>
                        <h1>Edit Profile</h1>
                        <p>User ID</p>
                        <p>{user?.user_id}</p>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input disabled={true} value={user?.email} type="email" id="email" name="email"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="gender">Gender</label>
                        <input type="text" value={editProps.gender} id="gender" name="gender" onChange={onChangeInput}/>
                    </div>
                    <div className={"dobInput"}>
                        <div className="input-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" value={editProps.dob && new Date(editProps?.dob)?.toISOString().split('T')[0]} id="dob" name="dob" onChange={onChangeInput}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" value={editProps.country} id="country" name="country" onChange={onChangeInput}/>
                        </div>
                    </div>
                    <div className={"saveButton"}>
                        <Link to={""}>Cancel</Link>
                        <button className={"loginButton"} onClick={onEdit}>Save Profile</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}