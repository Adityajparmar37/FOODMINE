import React from 'react'

export default function Title({ title, frontSize, margin }) {
    return (
        <>
            <h1 style={{ frontSize, margin, color: '#616161' }}>{title}</h1>
        </>
    )
}