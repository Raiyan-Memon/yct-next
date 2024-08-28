import ChessComponent from '@/components/ChessComponent'

export default function ChessPage() {
    return (
        <>
            <div id="chess-board" className="h-[100vh]">
                <ChessComponent />
            </div>
        </>
    )
}
