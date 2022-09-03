import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Nav = () => {
    const [hasMatches, setHasMatches] = useState(false)

    useEffect(() => {
        const savedMatches = { ...localStorage }

        if (savedMatches) {
            Object.keys(savedMatches).map(match => {
                if (match.startsWith('match')) {
                    setHasMatches(true)
                }
            })
        }
    }, [])

    return (
        <nav>
            <div className="wrap__lg">
                <ul>
                    <li>
                        <Link href="/">All Matches</Link>
                    </li>
                    {hasMatches && (
                        <li>
                            <Link href="/matches">Prev Matches</Link>
                        </li>
                    )}
                    <li>
                        <Link href="/how-to-score">How To Score</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav
