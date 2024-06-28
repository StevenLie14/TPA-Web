import {Footer} from "../component/Footer.tsx";
import {Navbar} from "../component/Navbar.tsx";
import {Link} from "react-router-dom";

export const ResetPasswordPage = () => {

    return (
        <div className={"wrapper"}>
            <Navbar/>
            <div className="container">
                <div className={"loginBox"}>
                    <h1>Reset Password</h1>
                    <div className="input-group">
                        <label htmlFor="password">New Password</label>
                        <input type="password" id="password" name="password"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" id="password" name="password"/>
                    </div>
                    <button className={"loginButton"}>Reset</button>
                    <Link to={"/login"}>Cancel</Link>
                </div>
            </div>
            <Footer/>
        </div>
    )

}