export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type ToDigits<T extends string> =
  T extends `${infer F extends Digit}${infer R}`
    ? [F, ...ToDigits<R>]
    : T extends `${infer F extends Digit}`
    ? [F]
    : [];

export type DropLeadingZeroDigits<T extends Digit[]> = T extends ["0"]
  ? ["0"]
  : T extends ["0", ...infer R extends Digit[]]
  ? DropLeadingZeroDigits<R>
  : T;

export type DropLeadingZero<T extends string> = T extends "0"
  ? "0"
  : T extends `0${infer R}`
  ? DropLeadingZero<R>
  : T;

export type Join<T extends string[], Acc extends string = ""> = T extends [
  infer F extends string,
  ...infer R extends string[]
]
  ? Join<R, `${Acc}${F}`>
  : Acc;
