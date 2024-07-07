// import {useEffect} from "react";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { AudioLines, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AlbumCard } from "../component/AlbumCard.tsx";
import { ControlMusic } from "../component/ControlMusic.tsx";
import { Main } from "../component/Main.tsx";
import { RightSideBar } from "../component/RightSideBar.tsx";
import { SideBar } from "../component/SideBar.tsx";
import { AlbumSkeleton } from "../component/skeleton/AlbumSkeleton.tsx";
import { useAuth } from "../context/UseAuth.tsx";
import { useSong } from "../context/UseSong.tsx";

export const HomePage = () => {
  const { user, authenticated } = useAuth();
  const navigate = useNavigate();
  const { song, changeSong } = useSong();
  const [gallery, setGallery] = useState<Play[]>();
  const [recommendation, setRecommendation] = useState<Album[]>();
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    if (authenticated == null) return;
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated]);

  const [page, setPage] = useState(2);

  useEffect(() => {
    const fetchRecommendations = () => {
      setIsLoad(true);
      setTimeout(() => {
        axios
          .get("http://localhost:4000/album/get-random")
          .then((res: AxiosResponse<WebResponse<Album[]>>) => {
            setRecommendation((prev) => {
              if (prev == undefined) return res.data.data;
              return [...prev, ...res.data.data];
            });
            setIsLoad(false);
          })
          .catch((err: unknown) => {
            console.log(err);
          });
      }, 1000);
    };
    fetchRecommendations();
  }, [page]);

  const handleScroll = () => {
    const content = document.getElementById("content") as HTMLDivElement;

    const { scrollTop, scrollHeight, clientHeight } = content;
    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      setPage((prev) => prev + 5);
    }
  };

  useEffect(() => {
    document
      .getElementById("content")
      ?.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    axios
      .get("http://localhost:4000/play/get-last?id=" + user.user_id)
      .then((res: AxiosResponse<WebResponse<Play[]>>) => {
        setGallery(res.data.data);
      })
      .catch((err: unknown) => {
        console.log(err);
      });
  }, [user]);

  const handlePlayClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={"outer"}>
      <div className={"App"}>
        <SideBar />
        <Main setSearch={null}>
          <div className={"gallery"}>
            <div className={"galleryContainer"}>
              {gallery?.map((play) => (
                <div
                  className={"galleryCard"}
                  key={play.song.songId}
                  onClick={() => {
                    navigate("/track/" + play.songId);
                  }}
                >
                  <div className={"gallerySong"}>
                    <img src={play.song.album.banner} alt={"gallery"} />
                    <h5>{play.song.title}</h5>
                  </div>
                  {play.song == song ? (
                    <AudioLines />
                  ) : (
                    <div className={"play"} onClick={handlePlayClick}>
                      <Play
                        onClick={() => {
                          changeSong(play.song.songId);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="cardContainer">
            <div className={"cardTitle"}>
              <h2>Recently Played</h2>
              {user && (
                <Link to={"/more/album/recently/" + user.user_id}>
                  Show More..
                </Link>
              )}
            </div>
            <div className="cardWrapper">
              {gallery &&
                gallery.length > 0 &&
                gallery.map((play) => (
                  <AlbumCard
                    album={play.song.album}
                    key={play.userId}
                    play={false}
                  />
                ))}
            </div>
          </div>

          <div className="cardContainer">
            <div className={"cardTitle"}>
              <h2>Recommendation</h2>
              <Link to={"/more/album/recommendation/a"}>Show More..</Link>
            </div>
            <div className="cardWrapper">
              {recommendation &&
                recommendation.length > 0 &&
                recommendation.map((album) => (
                  <AlbumCard album={album} key={album.albumId} play={false} />
                ))}

              {isLoad &&
                Array(5)
                  .fill(0)
                  .map((index: number) => <AlbumSkeleton key={index} />)}
            </div>
          </div>
          {/*<div className="cardContainer">*/}
          {/*  <div className="cardWrapper">*/}

          {/*  </div>*/}
          {/*</div>*/}
          {/*{page}*/}
        </Main>
        <RightSideBar />
      </div>
      <ControlMusic />
    </div>
  );
};
