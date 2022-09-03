import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
// import router from 'json-server/lib/server/router'

const matches = () => {
    const [matches, setMatches] = useState([])
    const [matchObject, setMatchObject] = useState([])
    const [allMatches, setAllMatches] = useState({})
    const [scores, setScores] = useState({ b1: 0, b2: 0 })

    // Get matches from local storage and convert JSON
    useEffect(() => {
        const savedMatches = { ...localStorage }

        console.log(savedMatches)

        if (savedMatches) {
            Object.keys(savedMatches).forEach(match => {
                // console.log(match.startsWith('match'))
                if (match.substring(0, 5) == 'match') {
                    setMatches(prev => [...prev, match])
                    // check nothing else interferes with local storage keys
                    if (
                        Object.keys(JSON.parse(savedMatches[match]))[0] === 'b1'
                    ) {
                        setMatchObject(prev => [
                            ...prev,
                            JSON.parse(savedMatches[match]),
                        ])
                    }
                }
            })
        }

        // Object.keys(savedMatches).length === 0 && Router.push('/')
    }, [])

    // add to new object to loop over in return
    useEffect(() => {
        matches.forEach((match, idx) => {
            setAllMatches(prev => ({ ...prev, [match]: matchObject[idx] }))
        })
    }, [matchObject])

    const handleReset = () => {
        if (
            confirm(
                "WARNING: Are you sure you want to delete all of your data? You can't undo this action - it is permanent...",
            )
        ) {
            console.log('clear')
            localStorage.clear()
            Router.push('/')
        }
    }

    return (
        <>
            <Head>
                <title>Previous Matches | Boxing Scorecard</title>
            </Head>

            <div className="wrap__lg">
                {Object.entries(allMatches).map(([key, val], idx) => {
                    let sum1 = Object.values(val.b1).reduce(
                        (part, a) => parseInt(part) + a,
                        0,
                    )
                    let sum2 = Object.values(val.b2).reduce(
                        (part, a) => parseInt(part) + a,
                        0,
                    )

                    const date = new Date(
                        key.substring(key.slice(0, -4).lastIndexOf('-') + 1),
                    )
                    const options = {
                        year: 'numeric',
                        month: 'short',
                    }
                    let formattedDate = date.toLocaleDateString(
                        'en-GB',
                        options,
                    )

                    return (
                        <div key={idx} className="prev-matches">
                            <h2 style={{ textTransform: 'capitalize' }}>
                                {key
                                    .slice(0, -8)
                                    .substring(6)
                                    .replaceAll('-', ' ')}
                                , {formattedDate}
                            </h2>

                            <table>
                                <thead>
                                    <tr>
                                        <td
                                            style={{
                                                textTransform: 'capitalize',
                                            }}>
                                            {
                                                key
                                                    .replaceAll('-', '_')
                                                    .split('_')[1]
                                            }
                                        </td>
                                        <td>Round</td>
                                        <td
                                            style={{
                                                textTransform: 'capitalize',
                                            }}>
                                            {key
                                                .slice(0, -8)
                                                .substring(
                                                    key
                                                        .slice(0, -8)
                                                        .lastIndexOf('-') + 1,
                                                )}
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(Object.keys(val.b1).length)].map(
                                        (e, i) => {
                                            return (
                                                <tr key={i + 1}>
                                                    <td>
                                                        {
                                                            val.b1[
                                                                'Round_' +
                                                                    (i + 1)
                                                            ]
                                                        }
                                                    </td>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        {
                                                            val.b2[
                                                                'Round_' +
                                                                    (i + 1)
                                                            ]
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        },
                                    )}
                                    <tr>
                                        <td>
                                            <strong>Total:</strong> {sum1}
                                        </td>
                                        <td>
                                            {sum1} - {sum2}
                                        </td>
                                        <td>
                                            <strong>Total:</strong> {sum2}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })}

                <button className="btn" onClick={handleReset}>
                    Reset All Data
                </button>
            </div>
        </>
    )
}

export default matches
