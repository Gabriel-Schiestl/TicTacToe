import { useState } from "react";
import checkWinner from "../Classes/checkWinner";
import { IA } from "../Classes/IA";

export default function useExecute() {
    const [board, setBoard] = useState(new IA());
    const [winner, setWinner] = useState<string | null>(null);
    const [playerPoints, setPlayerPoints] = useState(0);
    const [IAPoints, setIAPoints] = useState(0);

    const handleClick = (index: number) => {

        if (board.board[index] !== null || winner) return;

        const newBoard = new IA();
        newBoard.board = [...board.board];

        newBoard.board[index] = "X";

        const playerWon = checkWinner(newBoard.board);
        if (playerWon === "X") {
            setWinner("Você ganhou!");
            setPlayerPoints(playerPoints + 1)
            setBoard(newBoard);
            return;
        }

        const IAPlay = Number(newBoard.nextMove());
        if (IAPlay !== -1) {
            newBoard.board[IAPlay] = "O";
        }

        const IAWon = checkWinner(newBoard.board);
        if (IAWon === "O") {
            setWinner("Você perdeu!");
            setIAPoints(IAPoints + 1)
            setBoard(newBoard);
            return;
        }

        if (newBoard.board.every(cell => cell !== null)) {
            setWinner("Empate!");
        }

        setBoard(newBoard);
    }

    return {
        board,
        setBoard,
        handleClick,
        winner,
        setWinner,
        playerPoints,
        IAPoints,
        setIAPoints,
        setPlayerPoints
    }
}