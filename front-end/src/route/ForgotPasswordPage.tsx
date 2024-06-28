import {Navbar} from "../component/Navbar.tsx";
import {Link} from "react-router-dom";
import {Footer} from "../component/Footer.tsx";
import {ChangeEvent, useState} from "react";
import axios from "axios";

export const ForgotPasswordPage = () => {

    const onChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        if(e.target.value != ""){
            setEmail(e.target.value)
        }
    }

    const [email, setEmail] = useState<string>("")

    const searchAccount = () => {
        axios.post("http://localhost:4000/user/forgot",{
            email: email
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    return (
        <div className={"wrapper"}>
            <Navbar/>
            <div className="container">
                <div className={"loginBox"}>
                    <h1>Find Your Account</h1>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" onChange={onChangeInput}/>
                    </div>
                    <button className={"loginButton"} onClick={searchAccount} >Search</button>
                    <Link to={"/login"}>Cancel</Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}