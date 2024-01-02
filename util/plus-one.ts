type ParseInt<T extends string> = T extends `${infer Digit extends number}`
  ? Digit
  : never;

type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${ReverseString<Rest>}${First}`
  : "";

type RemoveLeadingZeroes<S extends string> = S extends "0"
  ? S
  : S extends `0${infer Rest}`
    ? RemoveLeadingZeroes<Rest>
    : S;

type InternalPlusOne<S extends string> = S extends "9"
  ? "01"
  : S extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 9
      ? `0${InternalPlusOne<Rest>}`
      : `${[1, 2, 3, 4, 5, 6, 7, 8, 9][Digit]}${Rest}`
    : never;

export type PlusOne<D extends number> = ParseInt<
  RemoveLeadingZeroes<ReverseString<InternalPlusOne<ReverseString<`${D}`>>>>
>;
