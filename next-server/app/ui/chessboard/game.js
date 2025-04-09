"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const chess_js_1 = require("chess.js");
const chessboard_1 = __importDefault(require("@/app/ui/chessboard/chessboard"));
const Board = ({ game, setGame }) => {
    const [selectedSquare, setSelectedSquare] = (0, react_1.useState)(null);
    const [validMoves, setValidMoves] = (0, react_1.useState)([]);
    const handleSquareClick = (square) => {
        if (!selectedSquare) {
            // Selecting a piece
            const piece = game.get(square); // Get piece at the clicked square
            if (!piece)
                return; // Do nothing if empty
            const moves = game.moves({ square: square, verbose: true }).map((move) => move.to);
            setSelectedSquare(square);
            setValidMoves(moves);
        }
        else {
            // Moving a piece
            if (validMoves.includes(square)) {
                const cloneGame = new chess_js_1.Chess(game.fen()); // Clone chess instance
                cloneGame.move({ from: selectedSquare, to: square });
                setGame(cloneGame); // Update board
            }
            else if (game.get(square)) {
                const piece = game.get(square);
                if (!piece) {
                    setSelectedSquare(null);
                    setValidMoves([]);
                    return;
                }
                const moves = game.moves({ square: square, verbose: true }).map((move) => move.to);
                setSelectedSquare(square);
                setValidMoves(moves);
            }
            // Clear selection regardless of move success
            setSelectedSquare(null);
            setValidMoves([]);
        }
    };
    const board = game.board();
    return (<div className="w-full h-full">
            <chessboard_1.default board={board} handleClick={handleSquareClick} validMoves={validMoves}/>
        </div>);
};
exports.default = Board;
