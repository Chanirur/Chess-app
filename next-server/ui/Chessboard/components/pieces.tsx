import { ColorType, PieceType } from "@/models";


interface Props {
	type: PieceType;
	color: ColorType;
	width: number
}

const Piece: React.FC<Props> = ({ type, color, width }) => {
	return (
		<div
			className={`${type}${color}`}
			style={{
				height: `${width}px`,
  				width: `${width}px`,
  				backgroundImage: `url('/pieces/${type}${color}.svg')`,
  				backgroundSize: 'cover',
			}}></div>
  )
};

export default Piece;
