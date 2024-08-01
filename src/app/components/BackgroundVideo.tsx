import React from 'react';


interface BackgroundVideoProps {
    src: string;
    type: string
  }

  const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src, type}) => {
    if(type === 'initial'){
      return (
       <> <div className="bg-white" id='background-video'> </div>
        <video id="background-videoIndex" autoPlay loop muted playsInline>
            <source src={src} type="video/mp4" />
        </video>
        </>
      )
    }else{
        return(
        <><div className="backgroundProviders" id='background-video'> </div>
        <video id="background-video" autoPlay loop muted playsInline>
            <source src={src} type="video/mp4" />
        </video></>
        )
    }
    }

    export default BackgroundVideo
