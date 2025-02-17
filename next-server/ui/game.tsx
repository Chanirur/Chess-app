'use client';

import { useState } from "react";
import { Chess, Square } from "chess.js";
import Chessboard from "@/ui/Chessboard/chessboard";

const Game = () => {
    const [game, setGame] = useState(new Chess())
    const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
    const [validMoves, setValidMoves] = useState<string[]>([]);

    const handleSquareClick = (square: string) => {
        if (!selectedSquare) {
          // Selecting a piece
          const piece = game.get(square as Square); // Get piece at the clicked square
          if (!piece) return; // Do nothing if empty
      
          const moves = game.moves({ square: square as Square, verbose: true }).map((move) => move.to);
          setSelectedSquare(square);
          setValidMoves(moves);
        } else {
          // Moving a piece
          if (validMoves.includes(square)) {
            const cloneGame = new Chess(game.fen()); // Clone chess instance
            cloneGame.move({ from: selectedSquare, to: square });
      
            setGame(cloneGame); // Update board
          }
      
          // Clear selection regardless of move success
          setSelectedSquare(null);
          setValidMoves([]);
        }
      };
      
    
    const board = game.board();

    return (
        <div>
            <Chessboard board={board} handleClick={handleSquareClick} validMoves={validMoves}/>
        </div>
    );
}

export default Game
