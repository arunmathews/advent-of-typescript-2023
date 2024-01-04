import { ParseInt, RemoveLeadingZeroes, ReverseString } from "./number-utils";

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
