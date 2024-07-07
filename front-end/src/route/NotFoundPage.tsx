import type { AxiosResponse } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";

export const NotFoundPage = () => {
  const [audioSource, setAudioSource] = useState("");
  useEffect(() => {
    // Fetch the music file from the server
    // fetch("http://localhost:4000/music") // Adjust URL if your server is hosted elsewhere
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.blob();
    //   })
    //   .then((blob) => {
    //     const audioURL = URL.createObjectURL(blob);
    //     setAudioSource(audioURL);
    //   })
    //   .catch((error: unknown) => {
    //     console.error("Error fetching music:", error);
    //   });

    axios
      .get(
        "http://localhost:4000/music?id=1a6ddab1-0503-442a-999e-9de4bcfa34fe",
        {
          responseType: "blob",
        },
      ) // Adjust URL if your server is hosted elsewhere
      .then((response: AxiosResponse<Blob>) => {
        const blob = response.data;
        const audioURL = URL.createObjectURL(blob);
        setAudioSource(audioURL);
      })
      .catch((error: unknown) => {
        console.error("Error fetching music:", error);
      });
  }, []);

  return (
    <div>
      <h1>404 Not Found</h1>
      {audioSource && (
        <audio controls>
          <source src={audioSource} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};
