import { ParseInt, RemoveLeadingZeroes, ReverseString } from "./number-utils";

type InternalMinusOne<S extends string> = S extends "0"
  ? "-1"
  : S extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 0
      ? `9${InternalMinusOne<Rest>}`
      : `${[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
    : never;

export type MinusOne<D extends number> = ParseInt<
  RemoveLeadingZeroes<ReverseString<InternalMinusOne<ReverseString<`${D}`>>>>
>;
