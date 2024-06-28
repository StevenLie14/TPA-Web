import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import './css/App.scss'
import {HomePage} from "./route/HomePage.tsx";
import {LoginPage} from "./route/LoginPage.tsx";
import {AuthProvider} from "./context/AuthProvider.tsx";
import {RegisterPage} from "./route/RegisterPage.tsx";
// import {ChatPage} from "./route/ChatPage.tsx";
import {ThemeProvider} from "./context/ThemeProvider.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {ForgotPasswordPage} from "./route/ForgotPasswordPage.tsx";
import {ResetPasswordPage} from "./route/ResetPasswordPage.tsx";
import {VerifyEmail} from "./route/VerifyEmail.tsx";

function App() {

  return (
      <Router>
          <GoogleOAuthProvider clientId={"841490014876-nc1omea8apsbevhcouqgbhq9mmc5tq7k.apps.googleusercontent.com"}>
              <ThemeProvider>
                  <AuthProvider>
                      <Routes>
                          <Route path="/home" element={<HomePage/>} />
                          <Route path="/login" element={<LoginPage/>} />
                          <Route path="/register" element={<RegisterPage/>} />
                          <Route path="/forgot" element={<ForgotPasswordPage/>} />
                          <Route path="/reset-pass" element={<ResetPasswordPage/>} />
                          <Route path="/verify-email" element={<VerifyEmail/>} />
                          {/*<Route path="/chat" element={<ChatPage/>} />*/}
                      </Routes>
                  </AuthProvider>
              </ThemeProvider>
          </GoogleOAuthProvider>
      </Router>
  )
}

export default App
