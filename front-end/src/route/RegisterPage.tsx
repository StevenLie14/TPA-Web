import {useState} from "react";
import * as React from "react";
import {Navbar} from "../component/Navbar.tsx";
import {Footer} from "../component/Footer.tsx";
import {Link} from "react-router-dom";
import ErrorModal from "../component/ErrorModal.tsx";
import {useAuth} from "../context/UseAuth.tsx";

export const RegisterPage = () => {
    const {register,googleLogin} = useAuth()
    // const {theme,setTheme} = useTheme()
    const [registerLogin, setRegisterLogin] = useState<RegisterProps>({} as RegisterProps)
    const [error, setError] = useState<string>("")
    const onRegister = () => {
        if(registerLogin.password != registerLogin.confirmPassword){
            setError("Passwords do not match")
            return
        }
        register(registerLogin)
    }

    const onChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value != ""){
            setRegisterLogin({...registerLogin,[e.target.name]: e.target.value})
        }
        console.log(registerLogin)
    }

    return(
        <div className={"wrapper"}>
            {error && <ErrorModal error={error} setError={setError}/>}
            <Navbar/>
            <div className="container">
                <div className={"loginBox"}>
                    <h1>Sign up to start Listening</h1>
                    <button className={"google"} onClick={() => googleLogin()}>Continue with Google</button>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" onChange={onChangeInput}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={onChangeInput}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" onChange={onChangeInput}/>
                    </div>
                    <button className={"loginButton"} onClick={onRegister}>Sign Up</button>
                    <hr/>
                    <p>Already have an account? <Link to={"/register"}>Log in to NJ Notify</Link></p>
                </div>
            </div>
            <Footer/>
        </div>
    )


}