"use client";

import Board from "@/app/ui/chessboard/game"
import { Chess } from "chess.js";
import { useEffect, useState } from "react";

const Page = () => {

    const [position, setPosition] = useState<string>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    const [moves, setMoves] = useState<(string | null)[][]>([['e4', 'e5'], ['Nf3', 'Nc6']]);
    const [yourTime, setYourTime] = useState<number>(NaN);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080/')
        
        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.type === 'move') {
                const move = data.move;
                setMoves((prevMoves) => [...prevMoves, [move.from, move.to]]);
                
                const cloneGame = new Chess(position); // Clone chess instance
                      cloneGame.move({ from: move.from, to: move.to });
                  
                      setPosition(() => cloneGame.fen()); // Update board
            
            }
            console.log(position)
        };

        ws.onclose = () => {
            console.log('WS closed');
        }

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        }
        setSocket(ws);
        return () => ws.close();
    }, [])

    const handleMove = (selectedSquare: string, square: string) => {
        if (socket) {

            const cloneGame = new Chess(position); // Clone chess instance
                      cloneGame.move({ from: selectedSquare, to: square });
                  
                      setPosition(() => cloneGame.fen()); // Update board
            
            socket.send(JSON.stringify({
                type: 'move',
                move: {
                    from: selectedSquare,
                    to: square
                }
            }))
        }
    }
    

    return (
        <>
            <div id="game" className="flex flex-row h-[100vh] w-[100vw] gap-[20px] items-center justify-center">
                <div
                    id="board"
                    style={{
                        width: "min(80vw, 80vh)",
                        height: "min(80vw, 80vh)"
                    }}
                >
                    <Board position={position} onMove={handleMove} />
                </div>
                <div
                    id="info-panel"
                    className="h-[50vh] w-[30vw] flex flex-col items-start flex-shrink-0 hidden"
                >
                    <div id="opponentTimer" className="w-[50%] h-[20%] bg-blue-500 flex items-center justify-center text-[2rem]">
                        <span id="h">
                            00
                        </span>
                        :
                        <span id="m">
                            45
                        </span>
                        :
                        <span id="s">
                            00
                        </span>
                    </div>
                    <div id="info" className="h-[60%] w-full bg-red-500 flex flex-col">
                        <div id="oppUsername" className="h-[40px] w-full bg-pink-500">
                            Opponent
                        </div>
                        <div
                            id="moves"
                            className="flex-grow w-full overflow-auto"
                        >
                            <div id="tools" className="w-full h-[20%] flex items-center justify-center bg-purple-500">
                                
                            </div>
                            {moves.map((move, index) => (
                                <div key={index} className="w-full h-[min(40px, 20%)] flex items-center justify-center">
                                    <div className="w-[25%] h-full bg-green-500 text-center">{index + 1}</div>
                                    <div className="w-[37.5%] h-full bg-green-500 text-start">{move[0]}</div>
                                    <div className="w-[37.5%] h-full bg-green-500 text-start">{move[1]}</div>
                                </div>
                            ))}
                        </div>
                        <div id="yourUser" className="h-[40px] w-full bg-pink-500">
                            You
                        </div>
                    </div>
                    <div id="yourTimer" className="w-[50%] h-[20%] bg-blue-500 flex items-center justify-center text-[2.5rem]">
                        <span id="h">
                            00
                        </span>
                        :
                        <span id="m">
                            45
                        </span>
                        :
                        <span id="s">
                            00
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;