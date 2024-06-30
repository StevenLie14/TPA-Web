import {createContext, ReactNode, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useGoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";

interface IProps{
    user : User | null,
    login: (user : LoginProps) => void,
    logout: () => void,
    register: (user : RegisterProps) => void,
    error: string,
    googleLogin : () => void
}

export const AuthContext = createContext<IProps>({} as IProps)


export const AuthProvider = ({children} : {children : ReactNode}) => {
    const [user,setUser] = useState(null)
    const [error,setError] = useState<string>("");
    const navigate = useNavigate()

    useEffect(() => {
        getUser()
        setError("")
    },[])

    const getUser = () => {
        fetch("http://localhost:4000/user/current-user", {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setUser(data.data);
                const eventSource = new EventSource('http://localhost:4000/sse/notification-stream');

                eventSource.onmessage = function(event) {

                    console.log('Received message:', event.data);
                };

                eventSource.addEventListener('notif-updated', function(event) {
                    console.log('Notification updated:', event.data);
                });
                eventSource.onerror = (error) => {
                    console.error('EventSource failed:', error);
                    eventSource.close();
                };
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });


    }


    const login = (user : LoginProps) => {


        axios.post("http://localhost:4000/user/login", {
            Email: user.email,
            Password: user.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then((response) => {
                console.log(response.data);
                navigate("/home")
                getUser();
            })
            .catch((error) => {
                console.error('Error fetching or processing data:', error);
            });
    }

    const register = (user : RegisterProps) => {
        console.log(user)

        const method = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email   : user.email,
                Password: user.password,
                Role : "user"
            })
        };

        fetch("http://localhost:4000/user/register",method).then((res) => res.json()).then((data) => {
            console.log(data)
        })

    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            axios.get(
                `http://localhost:4000/auth/google/callback?code=${codeResponse.code}`
                ,{
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }).then((res : AxiosResponse<WebResponse<User>>) => {
                console.log(res.data.data)
                navigate("/home")
            }).catch((err) => {
                console.log(err)
            })

        },
        flow: "auth-code",
    });

    const logout = () => {
        fetch("http://localhost:4000/user/logout").then((res) => res.json()).then((data) => {console.log(data)})
    }

    const values: IProps = {
        user,error,login,register,logout,googleLogin
    }
    return   (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>

    )
}

