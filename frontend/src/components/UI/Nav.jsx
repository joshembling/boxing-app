import React from 'react'
import Link from 'next/link'

const Nav = () => {
    return (
        <nav>
            <div className="wrap__lg">
                <ul>
                    <li>
                        <Link href="/">All Matches</Link>
                    </li>
                    <li>
                        <Link href="/matches">Prev Matches</Link>
                    </li>
                    <li>
                        <Link href="/">How To Score</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav
