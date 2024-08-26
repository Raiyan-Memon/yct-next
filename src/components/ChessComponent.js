'use client'

import { Chessboard } from 'react-chessboard'
import { useState } from 'react'
import { Chess } from 'chess.js'

export default function ChessComponent() {
    const [game, setGame] = useState(new Chess())

    function onDrop(sourceSquare, targetSquare) {
        const newGame = new Chess()
        newGame.load(game.fen())
        console.log(newGame.turn())

        const move = newGame.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q',
        })
        if (newGame.isCheck()) {
            alert('check')
        }
        console.log(move)

        if (move === null) return
        setGame(newGame)
    }

    return (
        <>
            <h2>Chess</h2>
            <div className="w-[100vw] md:w-[400px]">
                <Chessboard
                    animationDuration={0}
                    position={game.fen()}
                    onPieceDrop={onDrop}
                />
            </div>
        </>
    )
}
