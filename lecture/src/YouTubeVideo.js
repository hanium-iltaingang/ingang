import React from 'react';
import './YouTubeVideo.css';

const YouTubeVideo = () => {
    return (
        <div>
            <iframe 
                width="600" 
                height="400" 
                src="https://www.youtube.com/embed/oq1bttg9VhM?si=WEWv1y5QUSGuSCvP" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YouTubeVideo;
