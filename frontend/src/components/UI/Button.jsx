import React from 'react'
import Link from 'next/link'

const Button = ({ link, size, isDisabled, text }) => {
    return (
        <Link href={link}>
            <a>
                <button className="btn" disabled={isDisabled}>
                    {text}
                </button>
            </a>
        </Link>
    )
}

export default Button
