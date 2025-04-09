"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const square_1 = __importDefault(require("./components/square"));
require("./chessboard.css");
const Chessboard = ({ board, validMoves, handleClick }) => {
    const fileMapping = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const RankMapping = [8, 7, 6, 5, 4, 3, 2, 1];
    return (<div className="chessboard w-full h-full">
      {board.map((rank, rankIndex) => (<div key={rankIndex} className="rank w-full h-[12.5%] flex">
          {rank.map((square, squareIndex) => {
                const isLightSquare = (rankIndex + squareIndex) % 2 === 0;
                const squareString = `${fileMapping[squareIndex]}${RankMapping[rankIndex]}`;
                return (<square_1.default key={squareIndex} square={square} className={`${isLightSquare ? "light" : "dark"} ${validMoves.includes(squareString) ? "highlight" : ""}`} onClick={handleClick} squareString={squareString}/>);
            })}
        </div>))}
    </div>);
};
exports.default = Chessboard;
