import { SumDigits } from "../utils/add";
import { CompareDigits } from "../utils/compare";
import { Digit, ToDigits, Join } from "../utils/digit";
import { DivideDigits } from "../utils/divide";
import { SubDigits } from "../utils/subtract";
import { TrimEnd } from "../utils/trim";

// The inputs are chunked into smaller parts to avoid hitting the type limits
import {
  Input0,
  Input1,
  Input2,
  Input3,
  Input4,
  Input5,
  Input6,
  Input7,
  Input8,
  Input9,
  Input10,
  Input11,
  Input12,
  Input13,
  Input14,
  Input15,
  Input16,
  Input17,
  Input18,
  Input19,
  Input20,
  Input21,
  Input22,
  Input23,
  Input24,
  Input25,
  Input26,
  Input27,
  Input28,
  Input29,
  Input30,
  Input31,
  Input32,
  Input33,
} from "./input";

// Tests if a line in the input satisfies the problem statement
export type Test<T extends Digit[], Nums extends Digit[][]> = Nums extends [
  infer Last extends Digit[]
]
  ? // Only one number is left. It must match the test number
    CompareDigits<T, Last> extends 0
    ? true
    : false
  : Nums extends [...infer Head extends Digit[][], infer Last extends Digit[]]
  ? InnerTest<T, Head, Last, 0>
  : false;

type InnerTest<
  T extends Digit[],
  Head extends Digit[][],
  Last extends Digit[],
  Step extends 0 | 1 | 2 | 3
> = {
  // Test multiplication (T % Last == 0 && Test<T / Last, Head>)
  0: DivideDigits<T, Last> extends [
    infer Result extends Digit[],
    infer Remainder extends ["0"]
  ]
    ? Test<Result, Head> extends true
      ? true
      : // Fall through if that fails
        InnerTest<T, Head, Last, 1>
    : InnerTest<T, Head, Last, 1>;
  // Test addition (T >= Last && Test<T - Last, Head>)
  1: CompareDigits<T, Last> extends 0 | 1
    ? Test<SubDigits<T, Last>, Head> extends true
      ? true
      : // Fall through if that fails
        InnerTest<T, Head, Last, 2>
    : InnerTest<T, Head, Last, 2>;
  // Test concatenation (T == X || Last && Test<X, Head>)
  2: TrimEnd<T, Last> extends [...infer X extends Digit[]]
    ? Test<X, Head> extends true
      ? true
      : // Fall through if that fails
        InnerTest<T, Head, Last, 3>
    : InnerTest<T, Head, Last, 3>;
  // Test failed
  3: false;
}[Step];

type TestedHelper<T extends string[]> = {
  [K in keyof T]: ToDigits<T[K]>;
};

type Tested<T extends Record<keyof T, string[]>> = {
  [K in keyof T]: K extends string
    ? Test<ToDigits<K>, TestedHelper<T[K]>> extends true
      ? K
      : never
    : never;
};

type Filtered<T extends Record<keyof T, keyof T>> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};

type FilteredAsDigits<T extends Record<keyof T, keyof T>> = {
  [K in keyof T]: K extends string ? ToDigits<K> : never;
}[keyof T];

// Black magic from https://stackoverflow.com/a/55128956
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never;

// TS4.0+
type Push<T extends any[], V> = [...T, V];

// TS4.1+
type UnionToTuple<
  T,
  L = LastOf<T>,
  N = [T] extends [never] ? true : false
> = true extends N ? [] : Push<UnionToTuple<Exclude<T, L>>, L>;

// Here follows the slightly tedious part of combining the chunked inputs into the final solution
type Tested0 = Tested<Input0>;
type Filtered0 = Filtered<Tested0>;
type FilteredAsDigits0 = FilteredAsDigits<Filtered0>;
type ResultTuple0 = UnionToTuple<FilteredAsDigits0>;
type Result0 = SumDigits<ResultTuple0>;

type Tested1 = Tested<Input1>;
type Filtered1 = Filtered<Tested1>;
type FilteredAsDigits1 = FilteredAsDigits<Filtered1>;
type ResultTuple1 = UnionToTuple<FilteredAsDigits1>;
type Result1 = SumDigits<ResultTuple1>;

type Tested2 = Tested<Input2>;
type Filtered2 = Filtered<Tested2>;
type FilteredAsDigits2 = FilteredAsDigits<Filtered2>;
type ResultTuple2 = UnionToTuple<FilteredAsDigits2>;
type Result2 = SumDigits<ResultTuple2>;

type Tested3 = Tested<Input3>;
type Filtered3 = Filtered<Tested3>;
type FilteredAsDigits3 = FilteredAsDigits<Filtered3>;
type ResultTuple3 = UnionToTuple<FilteredAsDigits3>;
type Result3 = SumDigits<ResultTuple3>;

type Tested4 = Tested<Input4>;
type Filtered4 = Filtered<Tested4>;
type FilteredAsDigits4 = FilteredAsDigits<Filtered4>;
type ResultTuple4 = UnionToTuple<FilteredAsDigits4>;
type Result4 = SumDigits<ResultTuple4>;

type Tested5 = Tested<Input5>;
type Filtered5 = Filtered<Tested5>;
type FilteredAsDigits5 = FilteredAsDigits<Filtered5>;
type ResultTuple5 = UnionToTuple<FilteredAsDigits5>;
type Result5 = SumDigits<ResultTuple5>;

type Tested6 = Tested<Input6>;
type Filtered6 = Filtered<Tested6>;
type FilteredAsDigits6 = FilteredAsDigits<Filtered6>;
type ResultTuple6 = UnionToTuple<FilteredAsDigits6>;
type Result6 = SumDigits<ResultTuple6>;

type Tested7 = Tested<Input7>;
type Filtered7 = Filtered<Tested7>;
type FilteredAsDigits7 = FilteredAsDigits<Filtered7>;
type ResultTuple7 = UnionToTuple<FilteredAsDigits7>;
type Result7 = SumDigits<ResultTuple7>;

type Tested8 = Tested<Input8>;
type Filtered8 = Filtered<Tested8>;
type FilteredAsDigits8 = FilteredAsDigits<Filtered8>;
type ResultTuple8 = UnionToTuple<FilteredAsDigits8>;
type Result8 = SumDigits<ResultTuple8>;

type Tested9 = Tested<Input9>;
type Filtered9 = Filtered<Tested9>;
type FilteredAsDigits9 = FilteredAsDigits<Filtered9>;
type ResultTuple9 = UnionToTuple<FilteredAsDigits9>;
type Result9 = SumDigits<ResultTuple9>;

type Tested10 = Tested<Input10>;
type Filtered10 = Filtered<Tested10>;
type FilteredAsDigits10 = FilteredAsDigits<Filtered10>;
type ResultTuple10 = UnionToTuple<FilteredAsDigits10>;
type Result10 = SumDigits<ResultTuple10>;

type Tested11 = Tested<Input11>;
type Filtered11 = Filtered<Tested11>;
type FilteredAsDigits11 = FilteredAsDigits<Filtered11>;
type ResultTuple11 = UnionToTuple<FilteredAsDigits11>;
type Result11 = SumDigits<ResultTuple11>;

type Tested12 = Tested<Input12>;
type Filtered12 = Filtered<Tested12>;
type FilteredAsDigits12 = FilteredAsDigits<Filtered12>;
type ResultTuple12 = UnionToTuple<FilteredAsDigits12>;
type Result12 = SumDigits<ResultTuple12>;

type Tested13 = Tested<Input13>;
type Filtered13 = Filtered<Tested13>;
type FilteredAsDigits13 = FilteredAsDigits<Filtered13>;
type ResultTuple13 = UnionToTuple<FilteredAsDigits13>;
type Result13 = SumDigits<ResultTuple13>;

type Tested14 = Tested<Input14>;
type Filtered14 = Filtered<Tested14>;
type FilteredAsDigits14 = FilteredAsDigits<Filtered14>;
type ResultTuple14 = UnionToTuple<FilteredAsDigits14>;
type Result14 = SumDigits<ResultTuple14>;

type Tested15 = Tested<Input15>;
type Filtered15 = Filtered<Tested15>;
type FilteredAsDigits15 = FilteredAsDigits<Filtered15>;
type ResultTuple15 = UnionToTuple<FilteredAsDigits15>;
type Result15 = SumDigits<ResultTuple15>;

type Tested16 = Tested<Input16>;
type Filtered16 = Filtered<Tested16>;
type FilteredAsDigits16 = FilteredAsDigits<Filtered16>;
type ResultTuple16 = UnionToTuple<FilteredAsDigits16>;
type Result16 = SumDigits<ResultTuple16>;

type Tested17 = Tested<Input17>;
type Filtered17 = Filtered<Tested17>;
type FilteredAsDigits17 = FilteredAsDigits<Filtered17>;
type ResultTuple17 = UnionToTuple<FilteredAsDigits17>;
type Result17 = SumDigits<ResultTuple17>;

type Tested18 = Tested<Input18>;
type Filtered18 = Filtered<Tested18>;
type FilteredAsDigits18 = FilteredAsDigits<Filtered18>;
type ResultTuple18 = UnionToTuple<FilteredAsDigits18>;
type Result18 = SumDigits<ResultTuple18>;

type Tested19 = Tested<Input19>;
type Filtered19 = Filtered<Tested19>;
type FilteredAsDigits19 = FilteredAsDigits<Filtered19>;
type ResultTuple19 = UnionToTuple<FilteredAsDigits19>;
type Result19 = SumDigits<ResultTuple19>;

type Tested20 = Tested<Input20>;
type Filtered20 = Filtered<Tested20>;
type FilteredAsDigits20 = FilteredAsDigits<Filtered20>;
type ResultTuple20 = UnionToTuple<FilteredAsDigits20>;
type Result20 = SumDigits<ResultTuple20>;

type Tested21 = Tested<Input21>;
type Filtered21 = Filtered<Tested21>;
type FilteredAsDigits21 = FilteredAsDigits<Filtered21>;
type ResultTuple21 = UnionToTuple<FilteredAsDigits21>;
type Result21 = SumDigits<ResultTuple21>;

type Tested22 = Tested<Input22>;
type Filtered22 = Filtered<Tested22>;
type FilteredAsDigits22 = FilteredAsDigits<Filtered22>;
type ResultTuple22 = UnionToTuple<FilteredAsDigits22>;
type Result22 = SumDigits<ResultTuple22>;

type Tested23 = Tested<Input23>;
type Filtered23 = Filtered<Tested23>;
type FilteredAsDigits23 = FilteredAsDigits<Filtered23>;
type ResultTuple23 = UnionToTuple<FilteredAsDigits23>;
type Result23 = SumDigits<ResultTuple23>;

type Tested24 = Tested<Input24>;
type Filtered24 = Filtered<Tested24>;
type FilteredAsDigits24 = FilteredAsDigits<Filtered24>;
type ResultTuple24 = UnionToTuple<FilteredAsDigits24>;
type Result24 = SumDigits<ResultTuple24>;

type Tested25 = Tested<Input25>;
type Filtered25 = Filtered<Tested25>;
type FilteredAsDigits25 = FilteredAsDigits<Filtered25>;
type ResultTuple25 = UnionToTuple<FilteredAsDigits25>;
type Result25 = SumDigits<ResultTuple25>;

type Tested26 = Tested<Input26>;
type Filtered26 = Filtered<Tested26>;
type FilteredAsDigits26 = FilteredAsDigits<Filtered26>;
type ResultTuple26 = UnionToTuple<FilteredAsDigits26>;
type Result26 = SumDigits<ResultTuple26>;

type Tested27 = Tested<Input27>;
type Filtered27 = Filtered<Tested27>;
type FilteredAsDigits27 = FilteredAsDigits<Filtered27>;
type ResultTuple27 = UnionToTuple<FilteredAsDigits27>;
type Result27 = SumDigits<ResultTuple27>;

type Tested28 = Tested<Input28>;
type Filtered28 = Filtered<Tested28>;
type FilteredAsDigits28 = FilteredAsDigits<Filtered28>;
type ResultTuple28 = UnionToTuple<FilteredAsDigits28>;
type Result28 = SumDigits<ResultTuple28>;

type Tested29 = Tested<Input29>;
type Filtered29 = Filtered<Tested29>;
type FilteredAsDigits29 = FilteredAsDigits<Filtered29>;
type ResultTuple29 = UnionToTuple<FilteredAsDigits29>;
type Result29 = SumDigits<ResultTuple29>;

type Tested30 = Tested<Input30>;
type Filtered30 = Filtered<Tested30>;
type FilteredAsDigits30 = FilteredAsDigits<Filtered30>;
type ResultTuple30 = UnionToTuple<FilteredAsDigits30>;
type Result30 = SumDigits<ResultTuple30>;

type Tested31 = Tested<Input31>;
type Filtered31 = Filtered<Tested31>;
type FilteredAsDigits31 = FilteredAsDigits<Filtered31>;
type ResultTuple31 = UnionToTuple<FilteredAsDigits31>;
type Result31 = SumDigits<ResultTuple31>;

type Tested32 = Tested<Input32>;
type Filtered32 = Filtered<Tested32>;
type FilteredAsDigits32 = FilteredAsDigits<Filtered32>;
type ResultTuple32 = UnionToTuple<FilteredAsDigits32>;
type Result32 = SumDigits<ResultTuple32>;

type Tested33 = Tested<Input33>;
type Filtered33 = Filtered<Tested33>;
type FilteredAsDigits33 = FilteredAsDigits<Filtered33>;
type ResultTuple33 = UnionToTuple<FilteredAsDigits33>;
type Result33 = SumDigits<ResultTuple33>;

type Result = Join<
  SumDigits<
    [
      Result0,
      Result1,
      Result2,
      Result3,
      Result4,
      Result5,
      Result6,
      Result7,
      Result8,
      Result9,
      Result10,
      Result11,
      Result12,
      Result13,
      Result14,
      Result15,
      Result16,
      Result17,
      Result18,
      Result19,
      Result20,
      Result21,
      Result22,
      Result23,
      Result24,
      Result25,
      Result26,
      Result27,
      Result28,
      Result29,
      Result30,
      Result31,
      Result32,
      Result33
    ]
  >
> extends `${infer R extends number}`
  ? R
  : never;

  // The solution is emitted as a type error in the following line
const result: Result = "We need the facts, Mike!";
