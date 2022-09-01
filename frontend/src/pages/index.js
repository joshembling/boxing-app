import { server } from '../../config/index'

import Head from 'next/head'
import Link from 'next/link'

import Boxer from 'components/UI/Boxer'
import Card from 'components/UI/Card'
import Spinner from 'components/UI/Spinner'

import { useState, useEffect } from 'react'
import { get } from 'colornames'

export default function Home() {
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(false)

    const url = `${server}/api/`

    useEffect(() => {
        setLoading(true)
        fetch(url, {
            // method: 'GET',
            // headers: {
            //     Accept: 'application/json',
            //     'X-Authorization': `Bearer: 1|JByfZdGxU6hztrsvlYI6dPhrM6TPUsV3DUmvJOO0`,
            // },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data) // Prints result from `response.json()` in getRequest
                setMatches(data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            })
    }, [])

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return (
        <>
            <div className="wrap__lg">
                <div className="intro">
                    <h1>BOXING SCORECARD</h1>
                    <ul>
                        <li>
                            Score the biggest boxing matches as you watch them.
                        </li>
                        <li>
                            Share your results on your favourite social
                            platforms.
                        </li>
                        <li>View all matches you have scored previously.</li>
                    </ul>
                </div>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <div className="wrap__lg bg">
                    {matches.map(match => {
                        const getMatchDate = new Date(match.time)

                        return (
                            <div key={match.id} className="match">
                                {getMatchDate.setHours(0, 0, 0, 0) >
                                    yesterday.setHours(0, 0, 0, 0) && (
                                    <Card
                                        key={match.id}
                                        slug={match.slug}
                                        matchId={match.id}
                                        matchTitle={match.match_title}
                                        matchDate={match.date}
                                        matchTime={match.time}
                                        matchTimezone={match.timezone}
                                        organisations={match.organisations_list}
                                        organisationsTitle={
                                            match.organisations_title
                                        }
                                        tvImg={match.tv_img}
                                        tvTitle={match.tv_title}
                                        venue={match.venue}
                                        weightClass={match.weight_class}
                                        fullWeightTitle={
                                            match.full_weight_title
                                        }>
                                        <Boxer
                                            boxerName={match.boxer_1_name}
                                            boxerSurname={match.boxer_1_surname}
                                            boxerRecord={match.boxer_1_record}
                                            boxerHeadshot={
                                                match.boxer_1_headshot
                                            }
                                            boxerFlag={match.boxer_1_flag_img}
                                            boxerFlagAlt={
                                                match.boxer_1_flag_alt
                                            }
                                        />
                                        <Boxer
                                            boxerName={match.boxer_2_name}
                                            boxerSurname={match.boxer_2_surname}
                                            boxerRecord={match.boxer_2_record}
                                            boxerHeadshot={
                                                match.boxer_2_headshot
                                            }
                                            boxerFlag={match.boxer_2_flag_img}
                                            boxerFlagAlt={
                                                match.boxer_2_flag_alt
                                            }
                                        />
                                    </Card>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}
