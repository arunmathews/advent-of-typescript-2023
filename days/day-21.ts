import { PlusOne } from "../util/plus-one";
import { Equal, Expect } from "type-testing";

type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

type NewGame = {
  board: EmptyBoard;
  state: "❌";
};

type TicTacToePositionIndex = {
  top: 0;
  middle: 1;
  bottom: 2;
  left: 0;
  center: 1;
  right: 2;
};

type TicTacToeMove<
  Board extends TicTactToeBoard,
  Positions extends TicTacToePositions,
  Chip extends TicTacToeChip,
> = Positions extends `${infer Y extends
  keyof TicTacToePositionIndex}-${infer X extends keyof TicTacToePositionIndex}`
  ? ModifiedArray<
      Board,
      TicTacToePositionIndex[Y],
      TicTacToePositionIndex[X],
      Chip
    >
  : never;

type ModifiedArray<
  OriginalArray extends TicTacToeCell[][],
  Row extends number,
  Column extends number,
  NewValue extends TicTacToeChip,
> = {
  [I in keyof OriginalArray]: I extends `${Row}`
    ? OriginalArray[I] extends infer InnerArray
      ? {
          [J in keyof InnerArray]: J extends `${Column}`
            ? NewValue
            : InnerArray[J];
        }
      : never
    : OriginalArray[I];
};

type ChipWonDiagonal<
  Board extends TicTactToeBoard,
  Chip extends TicTacToeChip,
> = Board[0][0] | Board[1][1] | Board[2][2] extends Chip
  ? `${Chip} won`
  : Board[2][0] | Board[1][1] | Board[0][2] extends Chip
    ? `${Chip} won`
    : never;

type ChipWonStraight<
  Board extends TicTactToeBoard,
  Chip extends TicTacToeChip,
> = Board[0][number] extends Chip
  ? `${Chip} Won`
  : Board[1][number] extends Chip
    ? `${Chip} Won`
    : Board[2][number] extends Chip
      ? `${Chip} Won`
      : Board[number][0] extends Chip
        ? `${Chip} Won`
        : Board[number][1] extends Chip
          ? `${Chip} Won`
          : Board[number][2] extends Chip
            ? `${Chip} Won`
            : never;

type CheckDrawAllOccupied<Board extends TicTactToeBoard> =
  Board[number][number] extends TicTacToeChip ? "Draw" : never;

type NextState<
  Board,
  CurrState extends TicTacToeChip,
> = Board extends TicTactToeBoard
  ?
      | ChipWonStraight<Board, "❌">
      | ChipWonStraight<Board, "⭕">
      | ChipWonDiagonal<Board, "❌">
      | ChipWonDiagonal<Board, "⭕"> extends never
    ? CheckDrawAllOccupied<Board> extends never
      ? CurrState extends "❌"
        ? "⭕"
        : "❌"
      : CheckDrawAllOccupied<Board>
    :
        | ChipWonStraight<Board, "❌">
        | ChipWonStraight<Board, "⭕">
        | ChipWonDiagonal<Board, "❌">
        | ChipWonDiagonal<Board, "⭕">
  : never;

type NextGame<Board, CurrState extends TicTacToeChip> = {
  board: Board;
  state: NextState<Board, CurrState>;
};

type TicTacToe<
  Game extends TicTacToeGame,
  Positions extends TicTacToePositions,
> = Positions extends `${infer Y extends
  keyof TicTacToePositionIndex}-${infer X extends keyof TicTacToePositionIndex}`
  ? Game["board"][TicTacToePositionIndex[Y]][TicTacToePositionIndex[X]] extends TicTacToeEmptyCell
    ? Game["state"] extends TicTacToeChip
      ? NextGame<
          TicTacToeMove<Game["board"], Positions, Game["state"]>,
          Game["state"]
        >
      : Game
    : Game
  : Game;

type test_move1_actual = TicTacToe<NewGame, "top-center">;
type test_invalid_actual = TicTacToe<test_move1_actual, "top-center">;
