export type ModifiedArray<
  OriginalArray extends unknown[][],
  Row extends number,
  Column extends number,
  NewValue extends unknown,
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
