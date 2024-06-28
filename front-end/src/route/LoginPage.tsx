import {useAuth} from "../context/AuthProvider.tsx";
import {ChangeEvent, useState} from "react";
import {Navbar} from "../component/Navbar.tsx";
import {Footer} from "../component/Footer.tsx";
import {Link} from "react-router-dom";

export const LoginPage = () => {
    const {login,googleLogin} = useAuth()
    const [inputLogin, setInputLogin] = useState<LoginProps>({} as LoginProps)




    const onLogin = () => {
        login(inputLogin)
    }




    const onChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        if(e.target.value != ""){
            setInputLogin({...inputLogin,[e.target.name]: e.target.value})
        }
    }

    return(
        <div className={"wrapper"}>
            <Navbar/>
            <div className="container">
                <div className={"loginBox"}>
                    <h1>Login</h1>
                    <button className={"google"} onClick={() => googleLogin()}>Continue with Google</button>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" onChange={onChangeInput}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={onChangeInput}/>
                    </div>
                    <button className={"loginButton"} onClick={onLogin}>Login</button>
                    <Link to={"/forgot"}>Forgot your Password?</Link>
                    <hr/>
                    <p>Don't have an account? <Link to={"/register"}>Sign Up For NJ Notify</Link></p>
                </div>
            </div>
            <Footer/>
        </div>
    )


}