import { DigitAdder, SumDigits } from "./add";
import { CompareDigits } from "./compare";
import {
  Digit,
  DropLeadingZero,
  DropLeadingZeroDigits,
  Join,
  ToDigits,
} from "./digit";
import { SubDigit, SubDigits, Subtract } from "./subtract";

type FindMultiplier<
  Head extends Digit[],
  Divisor extends Digit[],
  Acc extends Digit[] = Divisor,
  Multiplier extends Digit = "1",
  Remainder extends Digit[] = Head
> = {
  [-1]: [SubDigit<Multiplier, "1", "0">[1], Remainder];
  0: [Multiplier, ["0"]];
  1: FindMultiplier<
    Head,
    Divisor,
    // @ts-expect-error
    SumDigits<[Acc, Divisor]>,
    DigitAdder<Multiplier, "1", "0">[1],
    SubDigits<Remainder, Divisor>
  >;
}[CompareDigits<Head, Acc>];

type Bounce<
  Head extends Digit[],
  Tail extends Digit[],
  Divisor extends Digit[],
  Result extends Digit[]
> = Tail extends [infer T0 extends Digit, ...infer Rest extends Digit[]]
  ? Div<[...Head, T0], Rest, Divisor, Result>
  : Div<Head, [], Divisor, Result>;

type Div<
  Head extends Digit[],
  Tail extends Digit[],
  Divisor extends Digit[],
  Result extends Digit[] = []
> = {
  [-1]: Tail extends [infer T0 extends Digit, ...infer Rest extends Digit[]]
    ? // The current head is smaller than the divisor, take the next digit and try again
      Div<[...Head, T0], Rest, Divisor, [...Result, "0"]>
    : // No more digits to take, return the result
      [
        Result extends [] ? ["0"] : [...Result, "0"],
        DropLeadingZeroDigits<Head>
      ];
  0: Tail extends [infer T0 extends Digit, ...infer Rest extends Digit[]]
    ? // The current head is exactly the divisor, add 1 to the result and take the next digit
      Div<[T0], Rest, Divisor, [...Result, "1"]>
    : // No more digits to take, return the result
      [[...Result, "1"], ["0"]];
  1: FindMultiplier<Head, Divisor> extends [
    infer Multiplier extends Digit,
    infer Remainder extends Digit[]
  ]
    ? // The current head divides by the divisor with a possible remainder. Add the multiplier to the result and continue with the remainder as the new head
      Tail extends [infer T0 extends Digit, ...infer Rest extends Digit[]]
      ? Div<[...Remainder, T0], Rest, Divisor, [...Result, Multiplier]>
      : // No more digits to take, return the result
        [[...Result, Multiplier], DropLeadingZeroDigits<Remainder>]
    : never;
}[CompareDigits<Head, Divisor>];

export type DivideDigits<T extends Digit[], U extends Digit[]> = T extends [
  infer Head extends Digit,
  ...infer Tail extends Digit[]
]
  ? Div<[Head], Tail, U, []>
  : never;

export type Divide<T extends `${number}`, U extends `${number}`> = DivideDigits<
  ToDigits<T>,
  ToDigits<U>
> extends [infer Result extends Digit[], infer Remainder extends Digit[]]
  ? [DropLeadingZero<Join<Result, "0">>, DropLeadingZero<Join<Remainder, "0">>]
  : never;

