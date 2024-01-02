import { Expect, Equal } from "type-testing";
import { PlusOne } from "../util/plus-one";

type BuildArray<S extends string, L extends number> = L extends 0
  ? []
  : [...BuildArray<S, MinusOne<L>>, S];

type Minus4<D extends number> = D extends 0 | 1 | 2 | 3
  ? D
  : Minus4<MinusOne<MinusOne<MinusOne<MinusOne<D>>>>>;

type SantaItems = ["🛹", "🚲", "🛴", "🏄"];

type RebuildInt<P extends Array<number>, Pos extends number> = P extends [
  infer First,
  ...infer Rest,
]
  ? First extends number
    ? Rest extends number[]
      ? [
          ...BuildArray<SantaItems[Minus4<Pos>], First>,
          ...RebuildInt<Rest, PlusOne<Pos>>,
        ]
      : never
    : never
  : [];

type Rebuild<P extends Array<number>> = RebuildInt<P, 0>;

type test_0_actual = Rebuild<[2, 1, 3, 3, 1, 1, 2]>;
//   ^?
type test_0_expected = [
  "🛹",
  "🛹",
  "🚲",
  "🛴",
  "🛴",
  "🛴",
  "🏄",
  "🏄",
  "🏄",
  "🛹",
  "🚲",
  "🛴",
  "🛴",
];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = Rebuild<[3, 3, 2, 1, 2, 1, 2]>;
//   ^?
type test_1_expected = [
  "🛹",
  "🛹",
  "🛹",
  "🚲",
  "🚲",
  "🚲",
  "🛴",
  "🛴",
  "🏄",
  "🛹",
  "🛹",
  "🚲",
  "🛴",
  "🛴",
];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = Rebuild<[2, 3, 3, 5, 1, 1, 2]>;
//   ^?
type test_2_expected = [
  "🛹",
  "🛹",
  "🚲",
  "🚲",
  "🚲",
  "🛴",
  "🛴",
  "🛴",
  "🏄",
  "🏄",
  "🏄",
  "🏄",
  "🏄",
  "🛹",
  "🚲",
  "🛴",
  "🛴",
];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;
