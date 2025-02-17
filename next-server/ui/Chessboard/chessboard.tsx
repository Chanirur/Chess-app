'use client';

import { SquareObjType } from '@/models';
import Square from './components/square';




interface Props {
  board: SquareObjType[][];
  validMoves: string[];
  handleClick: (square: string) => void;
}

const Chessboard: React.FC<Props> = ({ board, validMoves, handleClick }) => {

  const fileMapping = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const RankMapping = [8, 7, 6, 5, 4, 3, 2, 1];

    return (
      <div className="chessboard">
      {board.map((rank, rankIndex) => (
        <div key={rankIndex} className="rank">
          {rank.map((square, squareIndex) => {
            const isLightSquare = (rankIndex + squareIndex) % 2 === 0;
            const squareString = `${fileMapping[squareIndex]}${RankMapping[rankIndex]}`;
            return (
              <Square
                key={squareIndex}
                square={square}
                className={`${isLightSquare ? "light" : "dark"} ${validMoves.includes(squareString) ? "highlight" : ""}`}
                onClick={handleClick}
                squareString={squareString}
              />
            );
          })}
        </div>
      ))}
    </div>
      );
      
}

export default Chessboard;