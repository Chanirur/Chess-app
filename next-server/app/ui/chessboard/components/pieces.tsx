import { ColorType, PieceType } from "@/models";


interface Props {
	type: PieceType;
	color: ColorType;
}

const Piece: React.FC<Props> = ({ type, color}) => {
	return (
		<div
			className={`${type}${color} h-full w-full align-center`}
			style={{
  				backgroundImage: `url('/pieces/${type}${color}.svg')`,
				backgroundSize: 'cover'
			}}></div>
  )
};

export default Piece;
