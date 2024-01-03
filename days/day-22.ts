/** because "dashing" implies speed */
type Dasher = "💨";

/** representing dancing or grace */
type Dancer = "💃";

/** a deer, prancing */
type Prancer = "🦌";

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";

/** for the celestial body that shares its name */
type Comet = "☄️";

/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";

/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";

/** for his famous red nose */
type Rudolph = "🔴";

type Reindeer =
  | Dasher
  | Dancer
  | Prancer
  | Vixen
  | Comet
  | Cupid
  | Donner
  | Blitzen
  | Rudolph;

type AllTrue<BoolArr extends unknown[]> = BoolArr extends [
  infer First,
  ...infer Rest,
]
  ? First extends true
    ? AllTrue<Rest>
    : false
  : true;

type Validate<Sudoku extends Reindeer[][][]> = AllTrue<
  [
    Reindeer extends Sudoku[0][number][number] ? true : false,
    Reindeer extends Sudoku[1][number][number] ? true : false,
    Reindeer extends Sudoku[2][number][number] ? true : false,
    Reindeer extends Sudoku[3][number][number] ? true : false,
    Reindeer extends Sudoku[4][number][number] ? true : false,
    Reindeer extends Sudoku[5][number][number] ? true : false,
    Reindeer extends Sudoku[6][number][number] ? true : false,
    Reindeer extends Sudoku[7][number][number] ? true : false,
    Reindeer extends Sudoku[8][number][number] ? true : false,
    Reindeer extends Sudoku[number][0][0] ? true : false,
    Reindeer extends Sudoku[number][0][1] ? true : false,
    Reindeer extends Sudoku[number][0][2] ? true : false,
    Reindeer extends Sudoku[number][1][0] ? true : false,
    Reindeer extends Sudoku[number][1][1] ? true : false,
    Reindeer extends Sudoku[number][1][2] ? true : false,
    Reindeer extends Sudoku[number][2][0] ? true : false,
    Reindeer extends Sudoku[number][2][1] ? true : false,
    Reindeer extends Sudoku[number][2][2] ? true : false,
    Reindeer extends Sudoku[0 | 1 | 2][0][number] ? true : false,
    Reindeer extends Sudoku[0 | 1 | 2][1][number] ? true : false,
    Reindeer extends Sudoku[0 | 1 | 2][2][number] ? true : false,
    Reindeer extends Sudoku[3 | 4 | 5][0][number] ? true : false,
    Reindeer extends Sudoku[3 | 4 | 5][1][number] ? true : false,
    Reindeer extends Sudoku[3 | 4 | 5][2][number] ? true : false,
    Reindeer extends Sudoku[6 | 7 | 8][0][number] ? true : false,
    Reindeer extends Sudoku[6 | 7 | 8][1][number] ? true : false,
    Reindeer extends Sudoku[6 | 7 | 8][2][number] ? true : false,
  ]
>;

type Sudoku = [
  //   ^?
  [["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"]],
  [["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"]],
  [["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"]],
  [["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"], ["🔴", "🌩️", "🌟"]],
  [["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"]],
  [["⚡", "☄️", "❤️"], ["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"]],
  [["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"], ["🌩️", "🔴", "⚡"]],
  [["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"]],
  [["❤️", "🌟", "☄️"], ["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"]],
];

type Test = Sudoku[0 | 1 | 2][0][number];

type test_sudoku_1_actual = Validate<Sudoku>;
