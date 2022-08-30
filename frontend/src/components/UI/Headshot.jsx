import React from 'react'

const Headshot = ({ boxerName, boxerHeadshot }) => {
    return (
        <picture className="headshot">
            <img
                src={
                    boxerHeadshot
                        ? boxerHeadshot
                        : 'https://simg.nicepng.com/png/small/177-1770682_boxer-silhouette-png-wwwpixsharkcom-images-galleries-boxing-silhouette.png'
                }
                alt={`Image of ${boxerName}`}
                referrerPolicy="no-referrer"
            />
        </picture>
    )
}

export default Headshot
