import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/UseAuth.tsx";

export const Header = ({
  setSearch,
  search,
}: {
  setSearch: Dispatch<SetStateAction<string>> | null;
  search?: string;
}) => {
  const [isDrop, setIsDrop] = useState(false);
  const [history, setHistory] = useState<number>(window.history.length);
  const { user, logout } = useAuth();
  useEffect(() => {
    window.onpopstate = () => {
      setHistory(window.history.length);
    };
  }, [window.history.length]);

  const handleBack = () => {
    console.log(window.history.length);
    if (history < 2) return;
    window.history.back();
    setHistory(window.history.length);
  };

  const handleForward = () => {
    if (
      window.history.state !== null &&
      window.history.state !== undefined &&
      history > window.history.state.index
    ) {
      window.history.forward();
    } else {
      console.log("No forward history");
    }
    setHistory(window.history.length);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (setSearch === null) return;
    console.log("??");
    setSearch(e.target.value);
  };

  return (
    <header>
      <div className={"left"}>
        <ChevronLeft
          className={history > 2 ? "disabled" : ""}
          onClick={handleBack}
        />
        <ChevronRight
          className={
            window.history.state !== null &&
            window.history.state !== undefined &&
            history > window.history.state.index + 1
              ? ""
              : "disabled"
          }
          onClick={handleForward}
        />
        {window.location.pathname === "/search" && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              value={search}
            />
            <Search />
          </div>
        )}
      </div>

      <div className={"right"}>
        <div className="dropdown">
          <img
            src={user?.avatar ?? "/assets/download (6).png"}
            alt={"p"}
            className="profile"
            onClick={() => {
              setIsDrop(!isDrop);
            }}
          ></img>
          <div className={`dropdown-content ${isDrop ? "active" : ""}`}>
            {user && (
              <Link to={"/profile/" + user.user_id} className={"link"}>
                Profile
              </Link>
            )}
            <Link to={"/account/settings"} target={"_blank"} className={"link"}>
              Manage Account
            </Link>
            {user?.role === "Admin" && (
              <Link to={"/artist/verif/"} className={"link"}>
                Verify Artist
              </Link>
            )}
            <hr className={"hr"} />
            <p className={"link"} onClick={logout}>
              Logout
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
