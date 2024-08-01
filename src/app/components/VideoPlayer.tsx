import React from 'react';

interface VideoPlayerProps {
  src: string;
  type: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, type }) => {
  if (type === "paginaInicial") {
    return (
      <div className="video-container video-mask-initial">
        <video width="100%" height="auto" autoPlay loop playsInline muted>
          <source src={src} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      </div>
    )
  } else {
    return (
      <div className="video-container video-mask-logged">
        <video width="100%" height="auto" autoPlay loop playsInline muted controls>
          <source src={src} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      </div>
    );
  }
};


export default VideoPlayer;