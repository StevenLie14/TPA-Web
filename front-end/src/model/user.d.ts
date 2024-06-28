interface User{
    username: string;
    email: string;
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

interface AuthResponse{
    status: string;
    message: string;
    data : AuthProps
}