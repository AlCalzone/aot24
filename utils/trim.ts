import { Digit } from "./digit";

type Equals<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false;

export type TrimEnd<T extends Digit[], U extends Digit[]> = U extends []
  ? T
  : U extends [...infer URest extends Digit[], infer UEnd extends Digit]
  ? T extends []
    ? false
    : T extends [...infer TRest extends Digit[], infer TEnd extends Digit]
    ? Equals<UEnd, TEnd> extends true
      ? TrimEnd<TRest, URest>
      : false
    : false
  : false;