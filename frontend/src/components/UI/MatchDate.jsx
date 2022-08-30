import React from 'react'

const MatchDate = ({ matchDate, matchTime, matchTimezone }) => {
    const formatDate = new Date(matchTime).toUTCString()
    const formattedDate = new Date(formatDate).toLocaleDateString('en-UK', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
    const formattedTime = new Date(formatDate).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    })

    return (
        <div className="date">
            <span>{formattedDate}</span>
            <span>Ringwalk: {formattedTime}</span>
        </div>
    )
}

export default MatchDate
