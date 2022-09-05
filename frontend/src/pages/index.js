import { server } from '../../config/index'
import Head from 'next/head'

import Boxer from 'components/UI/Boxer'
import Card from 'components/UI/Card'
import Spinner from 'components/UI/Spinner'

import { AiOutlineFundView } from 'react-icons/ai'
import { BiShareAlt } from 'react-icons/bi'
import { GiBoxingGlove } from 'react-icons/gi'

import { useState, useEffect } from 'react'

export default function Home() {
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(false)

    const url = `${server}/api`

    useEffect(() => {
        setLoading(true)
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setMatches(data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            })
    }, [])

    matches.sort(function (a, b) {
        var c = new Date(a.time)
        var d = new Date(b.time)
        return c - d
    })

    console.log(matches)

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return (
        <>
            <Head>
                <title>Home | Boxing Scorecard</title>
            </Head>
            <div className="wrap__lg">
                <div className="intro">
                    <h1>BOXING SCORECARD</h1>
                    <ul>
                        <li>
                            <GiBoxingGlove /> Score the biggest boxing matches
                            as you watch them.
                        </li>
                        <li>
                            <BiShareAlt /> Share your results on your favourite
                            social platforms.
                        </li>
                        <li>
                            <AiOutlineFundView /> View all matches you have
                            scored previously.
                        </li>
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
                            <div key={match.id}>
                                {getMatchDate.setHours(0, 0, 0, 0) >
                                    yesterday.setHours(0, 0, 0, 0) && (
                                    <div className="match">
                                        <Card
                                            key={match.id}
                                            slug={match.slug}
                                            matchId={match.id}
                                            matchTitle={match.match_title}
                                            matchDate={match.date}
                                            matchTime={match.time}
                                            matchTimezone={match.timezone}
                                            organisations={
                                                match.organisations_list
                                            }
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
                                                boxerName={match.boxer_1.name}
                                                boxerSurname={
                                                    match.boxer_1.surname
                                                }
                                                boxerRecord={
                                                    match.boxer_1.record
                                                }
                                                boxerHeadshot={
                                                    match.boxer_1.headshot
                                                }
                                                boxerFlag={
                                                    match.boxer_1.flag.img
                                                }
                                                boxerFlagAlt={
                                                    match.boxer_1.flag.alt
                                                }
                                            />
                                            <Boxer
                                                boxerName={match.boxer_2.name}
                                                boxerSurname={
                                                    match.boxer_2.surname
                                                }
                                                boxerRecord={
                                                    match.boxer_2.record
                                                }
                                                boxerHeadshot={
                                                    match.boxer_2.headshot
                                                }
                                                boxerFlag={
                                                    match.boxer_2.flag.img
                                                }
                                                boxerFlagAlt={
                                                    match.boxer_2.flag.alt
                                                }
                                            />
                                        </Card>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}
