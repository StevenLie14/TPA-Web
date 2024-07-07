import type { AxiosResponse } from "axios";
import axios from "axios";
import { House, LibraryBig, Music4, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/UseAuth.tsx";
import { useSong } from "../context/UseSong.tsx";
import { SidePlaylist } from "./SidePlaylist.tsx";
import { SideUser } from "./SideUser.tsx";

export const SideBar = () => {
  const [following, setFollowing] = useState<Follow[]>([]);

  const { user } = useAuth();
  const { playlist } = useSong();

  useEffect(() => {
    if (user == null) return;

    axios
      .get("http://localhost:4000/get-following?id=" + user.user_id)
      .then((res: AxiosResponse<WebResponse<Follow[]>>) => {
        setFollowing(res.data.data);
        console.log("following");
        console.log(res.data.data);
      })
      .catch((err: unknown) => {
        console.log(err);
      });
  }, [user]);

  return (
    <nav className={"navbar"}>
      <div className={"logo"}>
        <ul className={"homeSearch"}>
          <li>
            <Link
              to={"/home"}
              className={`link ${window.location.pathname === "/home" ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <House />
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/search"}
              className={`link ${window.location.pathname === "/search" ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Search />
              Search
            </Link>
          </li>
          {user && user.role == "Artist" && (
            <li>
              <Link
                to={"/your-post"}
                className={`link ${window.location.pathname === "/your-post" ? "active" : ""}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Music4 />
                Your Post
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className={"library"}>
        <ul className={"libNav"}>
          <li>
            <div className={"leftLib"}>
              <Link
                to={"#"}
                className={`link ${window.location.pathname === "/library" ? "active" : ""}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                <LibraryBig />
                Your Library
              </Link>
            </div>
            <div className={"rightLib"}>
              <Link to={"/playlist/create"}>
                <Plus />
              </Link>
            </div>
          </li>
        </ul>
        {playlist?.map((playlist) => (
          <SidePlaylist playlist={playlist} key={playlist.playlistId} />
        ))}
        {following.map((follow) =>
          follow.Following.role === "Artist" ? (
            <SideUser user={follow.Following} key={follow.FollowingId} />
          ) : (
            ""
          ),
        )}
      </div>
    </nav>
  );
};
