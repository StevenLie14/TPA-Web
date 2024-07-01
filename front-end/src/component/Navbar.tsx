import {Link} from "react-router-dom";
import {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {useAuth} from "../context/UseAuth.tsx";

export const Navbar = () => {

    const {user} = useAuth()
    const [isDrop, setIsDrop] = useState(false);

    return(
        <nav>
            <div className={"left"}>
                <img className={"logo"} src={"/assets/NJOTIFY.png"} alt={""}/>
            </div>
            <div className={"right"}>
                <div className="dropdown">
                    <div className={"profile"} onClick={() => setIsDrop(!isDrop)}>
                        {user && <img src={user?.avatar} alt={"p"}></img>}
                        <div></div>
                        <p>Profile</p>
                        {!isDrop ? <ChevronDown/> : <ChevronUp/>}
                    </div>
                    <div className={`dropdown-content ${isDrop ? "active" : ""}`}>
                        <Link to={""} className={"link"}>Account</Link>
                        <Link to={""} className={"link"}>Profile</Link>
                        <Link to={""} className={"link"}>Private session</Link>
                        <Link to={""} className={"link"}>Settings</Link>
                        <hr className={"hr"}/>
                        <Link to={""} className={"link"}>Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}