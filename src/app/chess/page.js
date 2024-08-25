'use client'

import { useState } from 'react'
import Chess from 'chess.js'
import { Chessboard } from 'react-chessboard'

export default function ChessPage() {
    return (
        <>
            <h2>Chess </h2>
            <div className="w-[100vw] md:w-[400px]">
                <Chessboard id="BasicBoard" />
            </div>
        </>
    )
}
