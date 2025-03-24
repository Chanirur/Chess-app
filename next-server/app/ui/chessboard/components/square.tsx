import { SquareObjType } from "@/models";
import Piece from "./pieces";


interface Props {
  square: SquareObjType;
  className: string;
  squareString: string;
  onClick: (square: string) => void;
}

const Square: React.FC<Props> = ({ square, className, onClick, squareString }) => {
  if (square) {
    return (
      <div className={`square ${className} w-[12.5%] h-full`} onClick={() => onClick(squareString)}>
        <Piece color={square.color} type={square.type} />
      </div>
    );
  } else {
    return (
      <div className={`square ${className} w-[12.5%] h-full`} onClick={() => onClick(squareString)}></div>
	  )
  }
};

export default Square;
