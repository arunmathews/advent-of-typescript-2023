import { Expect, Equal } from "type-testing";

type BuildArray<S extends string, L extends number> = L extends 0
  ? []
  : [...BuildArray<S, MinusOne<L>>, S];

type BoxToysInternal<S extends string, N, D extends number> = D extends 0
  ? never
  : D extends N
    ? BuildArray<S, D> | BoxToysInternal<S, N, MinusOne<D>>
    : BoxToysInternal<S, N, MinusOne<D>>;

type BoxToys<S extends string, N> = BoxToysInternal<S, N, 10>;
type test_doll_actual = BoxToys<"doll", 1>;
//   ^?
type test_doll_expected = ["doll"];
type test_doll = Expect<Equal<test_doll_expected, test_doll_actual>>;

type test_nutcracker_actual = BoxToys<"nutcracker", 3 | 4>;
//   ^?
type test_nutcracker_expected =
  | ["nutcracker", "nutcracker", "nutcracker"]
  | ["nutcracker", "nutcracker", "nutcracker", "nutcracker"];
type test_nutcracker = Expect<
  Equal<test_nutcracker_expected, test_nutcracker_actual>
>;
