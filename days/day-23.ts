import { PlusOne } from "../util/plus-one";
import { MinusOne } from "../util/minus-one";
import { ModifiedArray } from "../util/array-utils";

import { Expect, Equal } from "type-testing";

type Connect4Chips = "🔴" | "🟡";
type Connect4Cell = Connect4Chips | "  ";
type Connect4State = "🔴" | "🟡" | "🔴 Won" | "🟡 Won" | "Draw";

type Connect4Game = {
  board: Connect4Board;
  state: Connect4State;
};

type Connect4Board = Connect4Cell[][];
type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
];

type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

type FindEmptyCellRec<
  Game,
  Column extends number,
  CurrInd extends number,
> = Game extends Connect4Board
  ? Game[CurrInd][Column] extends never
    ? never
    : Game[CurrInd][Column] extends "  "
      ? CurrInd
      : FindEmptyCellRec<Game, Column, MinusOne<CurrInd>>
  : never;

type FindEmptyCell<
  Game extends Connect4Board,
  Column extends number,
> = FindEmptyCellRec<Game, Column, 5>;

type Connect4Move<
  Board extends Connect4Board,
  Row extends number,
  Column extends number,
  Chip extends Connect4Chips,
> = ModifiedArray<Board, Row, Column, Chip>;

type ChipWonVerticalColumn<
  Board extends Connect4Board,
  Chip extends Connect4Chips,
  StartInd extends number,
  Column extends number,
> = Board[
  | StartInd
  | PlusOne<StartInd>
  | PlusOne<PlusOne<StartInd>>
  | PlusOne<PlusOne<PlusOne<StartInd>>>][Column] extends Chip
  ? `${Chip} Won`
  : never;

type ChipWonVerticalOneColumn<
  Board extends Connect4Board,
  Chip extends Connect4Chips,
  Column extends number,
> = ChipWonVerticalColumn<Board, Chip, 0, Column> extends never
  ? ChipWonVerticalColumn<Board, Chip, 1, Column> extends never
    ? ChipWonVerticalColumn<Board, Chip, 2, Column> extends never
      ? never
      : `${Chip} Won`
    : `${Chip} Won`
  : `${Chip} Won`;

type ChipVerticalAnyColumn<
  Board extends Connect4Board,
  Chip extends Connect4Chips,
> = ChipWonVerticalOneColumn<Board, Chip, 0> extends never
  ? ChipWonVerticalOneColumn<Board, Chip, 1> extends never
    ? ChipWonVerticalOneColumn<Board, Chip, 2> extends never
      ? ChipWonVerticalOneColumn<Board, Chip, 3> extends never
        ? ChipWonVerticalOneColumn<Board, Chip, 4> extends never
          ? ChipWonVerticalOneColumn<Board, Chip, 5> extends never
            ? ChipWonVerticalOneColumn<Board, Chip, 6> extends never
              ? never
              : `${Chip} Won`
            : `${Chip} Won`
          : `${Chip} Won`
        : `${Chip} Won`
      : `${Chip} Won`
    : `${Chip} Won`
  : `${Chip} Won`;

type ChipWonHorizontalRow<
  Board extends Connect4Board,
  Chip extends Connect4Chips,
  StartInd extends number,
  Row extends number,
> = Board[Row][
  | StartInd
  | PlusOne<StartInd>
  | PlusOne<PlusOne<StartInd>>
  | PlusOne<PlusOne<PlusOne<StartInd>>>] extends Chip
  ? `${Chip} Won`
  : never;

type ChipWonHorizontalOneRow<
  Board extends Connect4Board,
  Chip extends Connect4Chips,
  Row extends number,
> = ChipWonHorizontalRow<Board, Chip, 0, Row> extends never
  ? ChipWonVerticalColumn<Board, Chip, 1, Row> extends never
    ? ChipWonVerticalColumn<Board, Chip, 2, Row> extends never
      ? ChipWonVerticalColumn<Board, Chip, 3, Row> extends never
        ? never
        : `${Chip} Won`
      : `${Chip} Won`
    : `${Chip} Won`
  : `${Chip} Won`;

type ChipWonHorizontalAnyRow<
  Board extends Connect4Board,
  Chip extends Connect4Chips,
> = ChipWonHorizontalOneRow<Board, Chip, 0> extends never
  ? ChipWonHorizontalOneRow<Board, Chip, 1> extends never
    ? ChipWonHorizontalOneRow<Board, Chip, 2> extends never
      ? ChipWonHorizontalOneRow<Board, Chip, 3> extends never
        ? ChipWonHorizontalOneRow<Board, Chip, 4> extends never
          ? ChipWonHorizontalOneRow<Board, Chip, 5> extends never
            ? never
            : `${Chip} Won`
          : `${Chip} Won`
        : `${Chip} Won`
      : `${Chip} Won`
    : `${Chip} Won`
  : `${Chip} Won`;

type CheckDrawAllOccupied<Board extends Connect4Board> =
  Board[number][number] extends Connect4Chips ? "Draw" : never;

type NextState<
  Board,
  CurrState extends Connect4Chips,
> = Board extends Connect4Board
  ?
      | ChipVerticalAnyColumn<Board, "🔴">
      | ChipWonHorizontalAnyRow<Board, "🔴">
      | ChipVerticalAnyColumn<Board, "🟡">
      | ChipWonHorizontalAnyRow<Board, "🟡"> extends never
    ? CheckDrawAllOccupied<Board> extends never
      ? CurrState extends "🔴"
        ? "🟡"
        : "🔴"
      : CheckDrawAllOccupied<Board>
    :
        | ChipVerticalAnyColumn<Board, "🔴">
        | ChipWonHorizontalAnyRow<Board, "🔴">
        | ChipVerticalAnyColumn<Board, "🟡">
        | ChipWonHorizontalAnyRow<Board, "🟡">
  : never;

type NextGame<Board, CurrState extends Connect4Chips> = {
  board: Board;
  state: NextState<Board, CurrState>;
};

type Connect4<Game extends Connect4Game, Column extends number> = FindEmptyCell<
  Game["board"],
  Column
> extends never
  ? Game
  : Game["state"] extends Connect4Chips
    ? NextGame<
        Connect4Move<
          Game["board"],
          FindEmptyCell<Game["board"], Column>,
          Column,
          Game["state"]
        >,
        Game["state"]
      >
    : Game;

type test_move1_actual = Connect4<NewGame, 0>;

type test_move1_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
  ];
  state: "🔴";
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = Connect4<test_move1_actual, 0>;
//   ^?
type test_move2_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
  ];
  state: "🟡";
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = Connect4<test_move2_actual, 0>;
//   ^?
type test_move3_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
  ];
  state: "🔴";
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = Connect4<test_move3_actual, 1>;
//   ^?
type test_move4_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "  ", "  ", "  ", "  ", "  "],
  ];
  state: "🟡";
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_move5_actual = Connect4<test_move4_actual, 2>;
//   ^?
type test_move5_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "  ", "  ", "  ", "  "],
  ];
  state: "🔴";
};
type test_move5 = Expect<Equal<test_move5_actual, test_move5_expected>>;

type test_move6_actual = Connect4<test_move5_actual, 1>;
//   ^?
type test_move6_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "🔴", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "  ", "  ", "  ", "  "],
  ];
  state: "🟡";
};
type test_move6 = Expect<Equal<test_move6_actual, test_move6_expected>>;

type test_red_win_actual = Connect4<
  {
    board: [
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🔴", "🔴", "🔴", "  ", "  ", "  ", "  "],
      ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "],
    ];
    state: "🔴";
  },
  3
>;

type test_red_win_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "🔴", "🔴", "🔴", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "],
  ];
  state: "🔴 Won";
};

type test_red_win = Expect<Equal<test_red_win_actual, test_red_win_expected>>;

type test_yellow_win_actual = Connect4<
  {
    board: [
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🔴", "  ", "🔴", "🔴", "  ", "  ", "  "],
      ["🟡", "  ", "🟡", "🟡", "  ", "  ", "  "],
    ];
    state: "🟡";
  },
  1
>;

type test_yellow_win_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "🔴", "🔴", "  ", "  ", "  "],
    ["🟡", "🟡", "🟡", "🟡", "  ", "  ", "  "],
  ];
  state: "🟡 Won";
};

type test_yellow_win = Expect<
  Equal<test_yellow_win_actual, test_yellow_win_expected>
>;

type test_diagonal_yellow_win_actual = Connect4<
  {
    board: [
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "🟡", "🔴", "  ", "  ", "  "],
      ["🔴", "🟡", "🔴", "🔴", "  ", "  ", "  "],
      ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "],
    ];
    state: "🟡";
  },
  3
>;

type test_diagonal_yellow_win_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "🟡", "  ", "  ", "  "],
    ["  ", "  ", "🟡", "🔴", "  ", "  ", "  "],
    ["🔴", "🟡", "🔴", "🔴", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "],
  ];
  state: "🟡 Won";
};

type test_diagonal_yellow_win = Expect<
  Equal<test_diagonal_yellow_win_actual, test_diagonal_yellow_win_expected>
>;

type test_draw_actual = Connect4<
  {
    board: [
      ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "  "],
      ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
      ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
      ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
      ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
      ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
    ];
    state: "🟡";
  },
  6
>;

type test_draw_expected = {
  board: [
    ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
    ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
    ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
    ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
    ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
    ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
  ];
  state: "Draw";
};

type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;
