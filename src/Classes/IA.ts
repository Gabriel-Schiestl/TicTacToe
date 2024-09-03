import { combinations } from "./checkWinner";

export type Player = 'X' | 'O';
export type Cell = Player | null;

interface IIA {
    board: Cell[];
    combinations: number[][];
    nextMove(): number | string;
}

export class IA implements IIA {
    board = Array(9).fill(null);
    readonly combinations = combinations;

    public nextMove(): number | string {
        return (
            this.checkWinningMove('O') ||
            this.checkBlockingMove() ||
            this.checkEmptyMiddle() ||
            this.checkBorders() ||
            this.chooseRandomMove() ||
            -1
        );
    }

    private checkWinningMove(player: Player): number | null {
        for (const [a, b, c] of this.combinations) {
            if (this.board[a] === player && this.board[b] === player && this.board[c] === null) {
                return c;
            }
            if (this.board[a] === player && this.board[c] === player && this.board[b] === null) {
                return b;
            }
            if (this.board[b] === player && this.board[c] === player && this.board[a] === null) {
                return a;
            }
        }
        return null;
    }

    private checkBlockingMove(): number | null {
        return this.checkWinningMove('X');
    }

    private chooseRandomMove(): string | null {
        const emptyCells = this.board
            .map((cell, index) => cell === null ? index : null)
            .filter(index => index !== null) as number[];

        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            return String(emptyCells[randomIndex]);
        }
        return null;
    }

    private checkEmptyMiddle(): number | null {
        return this.board[4] === null ? 4 : null;
    }

    private checkBorders(): string | null {
        const corners = [0, 2, 6, 8];
        const boarders = [1, 3, 5, 7];

        const selectedCorners = corners.filter(corner => this.board[corner] === 'X');

        if (selectedCorners.length === 2) {
            const [first, second] = selectedCorners;

            if ((first === 0 && second === 8) || (first === 2 && second === 6)) {

                for (const border of boarders) {
                    if (this.board[border] === null) {
                        return String(border);
                    }
                }
            }
        }

        const allcornersEmpty = corners.filter(corner => this.board[corner] === null);

        if (allcornersEmpty.length === 4) {
            const index = Math.floor(Math.random() * allcornersEmpty.length);
            return String(allcornersEmpty[index]);
        }

        for (const corner of corners) {
            if (this.board[corner] === null) {
                return String(corner);
            }
        }
        return null;
    }
}