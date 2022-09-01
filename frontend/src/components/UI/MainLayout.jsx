import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

const MainLayout = ({ children }) => {
    return (
        <>
            <Nav />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default MainLayout
