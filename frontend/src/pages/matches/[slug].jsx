import { server } from '../../../config/index'
import Head from 'next/head'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import useLocalStorage from '@/hooks/useLocalStorage'

const Match = ({ match }) => {
    const rounds = match.full_weight_title.split(' ')[0]
    const [totals, setTotals] = useState({ b1: 0, b2: 0 })
    const [roundTotal, setRoundTotal] = useLocalStorage(`match_${match.slug}`, {
        b1: {
            Round_1: '',
            Round_2: '',
            Round_3: '',
            Round_4: '',
            Round_5: '',
            Round_6: '',
            Round_7: '',
            Round_8: '',
            Round_9: '',
            Round_10: '',
            Round_11: '',
            Round_12: '',
        },
        b2: {
            Round_1: '',
            Round_2: '',
            Round_3: '',
            Round_4: '',
            Round_5: '',
            Round_6: '',
            Round_7: '',
            Round_8: '',
            Round_9: '',
            Round_10: '',
            Round_11: '',
            Round_12: '',
        },
    })

    const handleDropdown = e => {
        const targetId = e.target.getAttribute('id')
        const points = e.target.value

        const targetIdRound = targetId.split('_').pop()
        const targetIdPlayer = targetId.split('_').shift()

        Object.keys(roundTotal.b1).map(key => {
            const object_key = key.split('_').pop()

            if (targetIdRound === object_key) {
                if (targetIdPlayer === 'b1') {
                    setRoundTotal(prev => ({
                        ...prev,
                        b1: {
                            ...prev.b1,
                            ['Round_' + object_key]: parseInt(points),
                        },
                    }))
                } else {
                    setRoundTotal(prev => ({
                        ...prev,
                        b2: {
                            ...prev.b2,
                            ['Round_' + object_key]: parseInt(points),
                        },
                    }))
                }
            }
        })
    }

    useEffect(() => {
        const sum1 = Object.values(roundTotal.b1).reduce(
            (part, a) => parseInt(part) + a,
            0,
        )
        const sum2 = Object.values(roundTotal.b2).reduce(
            (part, a) => parseInt(part) + a,
            0,
        )

        setTotals(prev => ({
            ...prev,
            b1: sum1,

            b2: sum2,
        }))
    }, [roundTotal])

    console.log(totals)

    return (
        <>
            <Head>
                <title>{match.match_title} | Boxing Scorecard</title>
            </Head>
            <div className="wrap__lg">
                <h2>{match.match_title}</h2>
                <table>
                    <thead>
                        <tr>
                            <td>{match.boxer_1_surname}</td>
                            <td>Round</td>
                            <td>{match.boxer_2_surname}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from(Array(parseInt(rounds)), (e, i) => {
                            // console.log(roundTotal.b1['Round_' + (i + 1)])
                            // console.log(
                            //     Object.keys(roundTotal.b1)[0].split('_').pop(),
                            // )
                            return (
                                <tr key={i + 1}>
                                    <td>
                                        <select
                                            name=""
                                            id={`b1_${i + 1}`}
                                            onChange={e => handleDropdown(e)}
                                            value={
                                                roundTotal.b1[
                                                    'Round_' + (i + 1)
                                                ] === ''
                                                    ? 0
                                                    : roundTotal.b1[
                                                          'Round_' + (i + 1)
                                                      ]
                                            }>
                                            <option value="0" disabled>
                                                Score...
                                            </option>
                                            {options.map((opt, id) => (
                                                <option
                                                    key={id}
                                                    value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{i + 1}</td>
                                    <td>
                                        <select
                                            name=""
                                            id={`b2_${i + 1}`}
                                            onChange={e => handleDropdown(e)}
                                            value={
                                                roundTotal.b2[
                                                    'Round_' + (i + 1)
                                                ] === ''
                                                    ? 0
                                                    : roundTotal.b2[
                                                          'Round_' + (i + 1)
                                                      ]
                                            }>
                                            <option value="0" disabled>
                                                Score...
                                            </option>
                                            {options.map((opt, id) => (
                                                <option
                                                    key={id}
                                                    value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td>
                                <strong>Total:</strong> {totals.b1}
                            </td>
                            <td>
                                {totals.b1} - {totals.b2}
                            </td>
                            <td>
                                <strong>Total:</strong> {totals.b2}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Link href="/">
                    <a>
                        <button className="btn">Go back</button>
                    </a>
                </Link>
            </div>
        </>
    )
}

const options = [
    { value: '10', label: '10' },
    { value: '9', label: '9' },
    { value: '8', label: '8' },
    { value: '7', label: '7' },
    { value: '6', label: '6' },
]

export const getStaticProps = async context => {
    const res = await fetch(`${server}/api/matches/${context.params.slug}`)

    const match = await res.json()

    return {
        props: {
            match,
        },
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/`)

    const matches = await res.json()

    const slugs = matches.map(match => match.slug)
    const paths = slugs.map(slug => ({
        params: {
            slug: slug.toString(),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

export default Match
