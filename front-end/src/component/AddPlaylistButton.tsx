import axios from "axios";
import { BadgeCheck, BadgePlus, Bookmark } from "lucide-react";
import { useState } from "react";

import { useSong } from "../context/UseSong.tsx";

export const AddPlaylistButton = ({ song }: { song: Song }) => {
  const [isDrop, setIsDrop] = useState(false);
  const { playlist, updatePlaylist } = useSong();

  const addToPlaylist = (play: Playlist) => {
    axios
      .post("http://localhost:4000/playlist-detail", {
        playlistId: play.playlistId,
        songId: song.songId,
      })
      .then((res) => {
        console.log(res);
        updatePlaylist();
      })
      .catch((err: unknown) => {
        console.log(err);
      });
  };

  const removePlaylist = (play: Playlist) => {
    const detailId = play.playlistDetails.find(
      (det) => det.songId === song.songId,
    )?.playlistDetailId;
    if (detailId == null) return;
    console.log(detailId);
    axios
      .delete("http://localhost:4000/playlist-detail?id=" + detailId)
      .then((res) => {
        console.log(res);
        updatePlaylist();
      })
      .catch((err: unknown) => {
        console.log(err);
      });
  };

  return (
    <div
      className="dropdown"
      onClick={() => {
        setIsDrop(!isDrop);
      }}
    >
      {playlist?.find((list) =>
        list.playlistDetails.find((det) => det.songId == song.songId),
      ) ? (
        <BadgeCheck />
      ) : (
        <BadgePlus />
      )}
      <div className={`dropdown-content ${isDrop ? "active" : ""}`}>
        {playlist?.map((play, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className={"bookmark"}
          >
            <img src={play.image} alt={play.title} />
            <p className={"link"}>{play.title}</p>
            <Bookmark
              onClick={() => {
                play.playlistDetails.some((det) => det.songId === song.songId)
                  ? removePlaylist(play)
                  : addToPlaylist(play);
              }}
              className={
                play.playlistDetails.some((det) => det.songId === song.songId)
                  ? "active"
                  : ""
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
