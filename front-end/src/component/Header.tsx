import myImage from '../assets/pxfuel.jpg'
import {Link} from "react-router-dom";
import {useState} from "react";

export const Header = () => {

    const [isDrop, setIsDrop] = useState(false);

    return (
        <header>
            <div className={"left"}>
                <p>back</p>
                <p>next</p>
            </div>
            <div className={"right"}>
                <p>Home</p>
                <p>Profile</p>
                <div className="dropdown">
                    <img src={myImage} alt={"p"} className="profile" onClick={() => setIsDrop(!isDrop)}></img>
                    <div className={`dropdown-content ${isDrop ? "active": ""}`}>
                        <Link to={""} className={"link"}>Account</Link>
                        <Link to={""} className={"link"}>Profile</Link>
                        <Link to={""} className={"link"}>Private session</Link>
                        <Link to={""} className={"link"}>Settings</Link>
                        <hr className={"hr"}/>
                        <Link to={""} className={"link"}>Logout</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}