import React from 'react'


import GuestFooter from '../footer/footter'
import ResponsiveAppBar from '../header/header'

export default function Wrapper({ children }) {
    return (
        <>
            <ResponsiveAppBar />
            {children}
            <GuestFooter />
        </>
    )
}
