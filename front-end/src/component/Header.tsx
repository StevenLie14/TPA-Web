import {Link} from "react-router-dom";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ChevronLeft, ChevronRight, Search} from "lucide-react";

export const Header = ({setSearch} : {setSearch : Dispatch<SetStateAction<string>> | null }) => {

    const [isDrop, setIsDrop] = useState(false);
    const [history, setHistory] = useState<number>(window.history.length)

    useEffect(() => {
        window.onpopstate = () => {
            setHistory(window.history.length)
        }
    }, [window.history.length]);


    const handleBack = () => {
        console.log(window.history.length)
        if (history < 2) return
            window.history.back();
        setHistory(window.history.length)

    }

    const handleForward = () => {
        if (window.history.state !== null && window.history.state !== undefined && history > window.history.state.index + 1) {
            window.history.forward()
        }else{
            console.log("No forward history")
        }
            setHistory(window.history.length)
    }

    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") return
        if (setSearch === null) return
        setSearch(e.target.value)
    }

    return (
        <header>
            <div className={"left"}>
                <ChevronLeft className={`${history > 2 ? "disabled" : ""}`} onClick={handleBack}/>
                <ChevronRight
                    className={`${window.history.state !== null && window.history.state !== undefined && history > window.history.state.index + 1 ? "" : "disabled"}`}
                    onClick={handleForward}/>
                {window.location.pathname === "/search" &&
                    (
                        <div className="search-container">
                            <input type="text" placeholder="Search..." onChange={handleSearch}/>
                            <Search/>
                        </div>
                    )
                }

            </div>

            <div className={"right"}>
                <div className="dropdown">
                <img src={"/assets/pxfuel.jpg"} alt={"p"} className="profile"
                         onClick={() => setIsDrop(!isDrop)}></img>
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

        </header>
    )
}