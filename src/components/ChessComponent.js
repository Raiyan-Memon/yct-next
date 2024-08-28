'use client'

import { Chessboard } from 'react-chessboard'
import { useEffect, useState } from 'react'
import { Chess } from 'chess.js'

export default function ChessComponent() {
    const [game, setGame] = useState(new Chess())
    // const [validMoves, setValidMoves] = useState([])
    // const [selectedPiece, setSelectedPiece] = useState('')
    const [moveFrom, setMoveFrom] = useState('')
    // const [moveTo, setMoveTo] = useState('')
    const [turn, setTurn] = useState('')
    const [rightClickedSquares, setRightClickedSquares] = useState({})

    let source = ''
    let target = ''

    function onDrop(sourceSquare, targetSquare) {
        source = sourceSquare
        target = targetSquare
        makeAMove(source, target)
    }

    function makeAMove(source, target) {
        const newGame = new Chess()
        newGame.load(game.fen())
        try {
            const move = newGame.move({
                from: source,
                to: target,
                promotion: 'q',
            })
            setMoveFrom('')
            setRightClickedSquares({})
            if (move === null) return
        } catch (error) {
            // setRightClickedSquares({})
            setGame(newGame)
        }
        if (newGame.isCheck()) {
            alert('check')
        }
        setGame(newGame)
    }

    function pieceClick(piece, square) {
        const colour = 'rgba(0, 0, 255, 0.4)'

        setMoveFrom(square)
        setRightClickedSquares({
            rightClickedSquares,
            [square]:
                rightClickedSquares[square] &&
                rightClickedSquares[square].backgroundColor === colour
                    ? undefined
                    : {
                          backgroundColor: colour,
                      },
        })

        const valid = game.moves({ square })
     

        let newSquareColor = {}

        valid.forEach(element => {
            // console.log(element)

            const squarelength = element.length

            const withoutPieceSquare =
                element[squarelength - 1] == '+'
                    ? element[squarelength - 3] + element[squarelength - 2]
                    : element[squarelength - 2] + element[squarelength - 1]

            // console.log(withoutPieceSquare)

            newSquareColor[withoutPieceSquare] = {
                backgroundColor: colour,
            }
        })

        newSquareColor[square] = {
            backgroundColor: colour,
        }

        setRightClickedSquares({
            // ...rightClickedSquares,
            ...newSquareColor,
        })
        // setValidMoves(game.moves({ square }))
    }

    function onSquareClick(square) {
        // setMoveTo(square)

        if (moveFrom) {
            makeAMove(moveFrom, square)
            // console.log(validMoves)
            // console.log(square)
            // console.log(piece)
        }
    }

    function onSquareRightClick(square) {
        const colour = 'rgba(0, 0, 255, 0.4)'
        setRightClickedSquares({
            ...rightClickedSquares,
            [square]:
                rightClickedSquares[square] &&
                rightClickedSquares[square].backgroundColor === colour
                    ? undefined
                    : {
                          backgroundColor: colour,
                      },
        })
        // console.log(rightClickedSquares)
    }
    useEffect(() => {
        setTurn(game.turn())
    }, [game])

    return (
        <>
            <h1> My TUrn : {turn}</h1>
            <h2>Chess</h2>
            <h2>
                Turn :
                {turn == 'w' ? (
                    <span className="bg-slate-400 text-black p-3">
                        White Turn
                    </span>
                ) : (
                    <span className="bg-black text-white p-3">Black Turn</span>
                )}
            </h2>
            <div className="w-[100vw] md:w-[400px]">
                <Chessboard
                    onSquareRightClick={onSquareRightClick}
                    onSquareClick={onSquareClick}
                    onPieceClick={pieceClick}
                    animationDuration={300}
                    position={game.fen()}
                    onPieceDrop={onDrop}
                    customSquareStyles={{
                        // ...moveSquares,
                        // ...optionSquares,
                        ...rightClickedSquares,
                    }}
                />
            </div>
        </>
    )
}
