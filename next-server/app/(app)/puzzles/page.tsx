"use client";

import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import Board from "../../ui/chessboard/game";

export default function Puzzles() {
	const [position, setPosition] = useState<Chess>(new Chess());

	// Function to update the position with a new FEN string
	const updatePosition = (fen: string) => {
		const newPosition = new Chess();
		try {
			newPosition.load(fen);
		} catch {
			console.error("Invalid FEN string:", fen);
		}
		setPosition(newPosition);
	};

	const fetchAndSetPosition = async () => {
		const response = await fetch("https://api.chess.com/pub/puzzle/random");
		const data = await response.json();
		updatePosition(data.fen);
	};

	useEffect(() => {
		fetch("https://api.chess.com/pub/puzzle/random")
			.then((response) => response.json())
			.then((data) => updatePosition(data.fen));
	}, []);
	
	return (
		<div>
			<button
				onClick={fetchAndSetPosition}
			> Random
			</button>
			<Board game={position} setGame={setPosition} />
		</div>
	);
}
