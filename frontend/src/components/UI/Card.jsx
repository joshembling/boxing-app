import React from 'react'
import Button from './Button'
import MatchDate from './MatchDate'
import { GoLocation } from 'react-icons/go'

const Card = ({
    slug,
    matchId,
    matchTitle,
    matchDate,
    matchTime,
    matchTimezone,
    tvImg,
    tvTitle,
    organisations,
    organisationsTitle,
    venue,
    weightClass,
    fullWeightClass,
    children,
}) => {
    const getMatchDate = new Date(matchTime)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    // if (getMatchDate.setHours(0, 0, 0, 0) > yesterday.setHours(0, 0, 0, 0)) {
    //     console.log(getMatchDate)
    // } else {
    //     console.log('expired')
    // }

    return (
        <div key={matchId} className="card">
            <div className="card__grid">
                <div className="title">{matchTitle}</div>
                {children}
            </div>

            <div className="match-info">
                <div className="match-info__details">
                    <div className="match-info__title">
                        <h3>{matchTitle}</h3>
                        <strong>{weightClass}</strong>
                    </div>
                    <MatchDate
                        matchDate={matchDate}
                        matchTime={matchTime}
                        matchTimezone={matchTimezone}
                    />
                </div>

                <div className="tv-orgs">
                    <h4 className="info">
                        <GoLocation /> {venue}
                    </h4>
                    <div className="tv">
                        {tvImg &&
                            tvImg.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    rel="no-referrer"
                                    referrerPolicy="no-referrer"
                                    alt={tvTitle[idx]}
                                />
                            ))}
                    </div>
                    {organisationsTitle && <h4>{organisationsTitle}</h4>}
                    {organisations && (
                        <ul>
                            {organisations.map((org, idx) => (
                                <li key={idx}>{org}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <Button
                link={`/matches/${slug}`}
                // isDisabled={
                //     getMatchDate.setHours(0, 0, 0, 0) >=
                //     tomorrow.setHours(0, 0, 0, 0)
                //         ? true
                //         : false
                // }
            />
        </div>
    )
}

export default Card
