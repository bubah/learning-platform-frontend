import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css"; // Import Video.js CSS

const VideoPlayer = ({ src }: { src: string }) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoNode.current) {
      return;
    }
    const player = videojs(videoNode.current, {
      controls: true,
      autoplay: false,
      preload: "auto",
      techOrder: ["html5"], // Use HTML5 tech for MP4 and other formats
      controlBar: {
        playToggle: true, // Ensure the play button is enabled
        fullscreenToggle: true,
        volumePanel: { inline: false },
      },
      sources: [
        {
          src: src, // HLS stream URL
          type: "application/x-mpegURL", // Specify HLS MIME type
        },
      ],
    });

    console.log("player", player);
    return () => {
      player.dispose(); // Clean up player when component is unmounted
    };
  }, [src]);

  console.log("vidoe node", videoNode.current);
  return (
      <video
        ref={(r) => {
            if(!r) {
                return
            }
            if(videoNode && videoNode.current) {
                videoNode.current = r
            }
        }}
        className="video-js vjs-default-skin"
        controls
        style={{ width: '100%', backgroundColor: 'white', minHeight: 400, maxHeight: 480 }}
      />
  );
};

export default VideoPlayer;
