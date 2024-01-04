export type ParseInt<T extends string> = T extends `${infer Digit extends
  number}`
  ? Digit
  : never;

export type ReverseString<S extends string> =
  S extends `${infer First}${infer Rest}`
    ? `${ReverseString<Rest>}${First}`
    : "";

export type RemoveLeadingZeroes<S extends string> = S extends "0"
  ? S
  : S extends `0${infer Rest}`
    ? RemoveLeadingZeroes<Rest>
    : S;
