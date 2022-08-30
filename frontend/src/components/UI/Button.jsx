import React from 'react'
import Link from 'next/link'

const Button = ({ link, size, isDisabled }) => {
    return (
        <Link href={link}>
            <a>
                <button className="btn" disabled={isDisabled}>
                    Score this match
                </button>
            </a>
        </Link>
    )
}

export default Button
