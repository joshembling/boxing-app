import React from 'react'

const Headshot = ({ boxerName, boxerHeadshot }) => {
    return (
        <picture className="headshot">
            <img
                src={
                    boxerHeadshot ? boxerHeadshot : '/images/blank-fighter.png'
                }
                alt={`Image of ${boxerName}`}
                referrerPolicy="no-referrer"
            />
        </picture>
    )
}

export default Headshot
