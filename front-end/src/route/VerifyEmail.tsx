import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { Footer } from "../component/Footer.tsx";
import { Navbar } from "../component/Navbar.tsx";

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (id != null) {
      axios
        .post("http://localhost:4000/user/update-ver?id=" + id, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err: unknown) => {
          console.log(err);
          navigate("/login");
        });
    }
  }, [id]);

  return (
    <div className={"wrapper"}>
      <Navbar />
      <div className="container">
        <div className={"loginBox"}>
          <h1>Your Email is Verified</h1>
          <Link to={"/login"}>Go to Login</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
