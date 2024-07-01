interface User{
    user_id: string;
    username: string;
    email: string;
    role: string;
    avatar: string;
    country: string;
    gender: string;
    dob : string
}

interface EditProps{
    userId: string;
    gender: string;
    dob: string;
    country: string;
}

interface LoginProps{
    email: string;
    password: string;
}

interface RegisterProps{
    email: string;
    password: string;
    confirmPassword: string;
}

interface AuthProps{
    token: string;
    email: string;
    role: string;
    username: string;
    user_id: string;
}

interface WebResponse<T>{
    status: string;
    message: string;
    data : T;
}