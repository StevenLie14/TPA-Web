import {Footer} from "../component/Footer.tsx";
import {Navbar} from "../component/Navbar.tsx";
import {Link, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

export const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        if (id != null || id != ""){
            axios.get("http://localhost:4000/user/update-ver?id="+id,{
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
        },[])

    return (
        <div className={"wrapper"}>
            <Navbar/>
            <div className="container">
                <div className={"loginBox"}>
                    <h1>Your Email is Verified</h1>
                    <Link to={"/login"}>Go to Login</Link>
                </div>
            </div>
            <Footer/>
        </div>
    )
}