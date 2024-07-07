import { useNavigate } from "react-router-dom";

export const SongTable = ({ song, index }: { song: Song; index: number }) => {
  const navigate = useNavigate();
  return (
    <div
      className={"songTable"}
      onClick={() => {
        navigate("/track/" + song.songId);
      }}
    >
      <div className={"title"}>
        <p>{index + 1}. </p>
        <img src={song.album.banner} alt="Song Cover" />
        <h3>{song.title}</h3>
      </div>
      <p>{song.play.length}</p>
      <p>
        {Math.floor(song.duration / 60)}:
        {Math.floor(song.duration % 60)
          .toString()
          .padStart(2, "0")}
      </p>
    </div>
  );
};
