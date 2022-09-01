import React from 'react'
import Headshot from './Headshot'

const Boxer = ({
    boxerName,
    boxerSurname,
    boxerRecord,
    boxerHeadshot,
    boxerFlag,
    boxerFlagAlt,
}) => {
    return (
        <div className="boxer">
            <Headshot boxerName={boxerName} boxerHeadshot={boxerHeadshot} />
            <div className="boxer__info">
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
                        <span>{boxerSurname ? boxerSurname : boxerName}</span>
                    </h3>
                </div>
                <div className="boxer__record">
                    <strong>Record:</strong> <span>{boxerRecord}</span>
                </div>
            </div>
        </div>
    )
}

export default Boxer
