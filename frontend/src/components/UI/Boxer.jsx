import React from 'react'
import Headshot from './Headshot'

const Boxer = ({
    boxerName,
    boxerRecord,
    boxerHeadshot,
    boxerFlag,
    boxerFlagAlt,
}) => {
    return (
        <div className="boxer">
            <Headshot boxerName={boxerName} boxerHeadshot={boxerHeadshot} />
            <div className="boxer__name">
                {boxerFlag && (
                    <img
                        src={boxerFlag}
                        alt={boxerFlagAlt}
                        className="boxer__flag"
                    />
                )}
                <h3>
                    <span>{boxerName}</span>
                </h3>
            </div>
            <div className="boxer__record">
                <strong>Record:</strong> <span>{boxerRecord}</span>
            </div>
        </div>
    )
}

export default Boxer
