import { DigitAdder, SumDigits } from "./add";
import { Digit, DropLeadingZero, Join, ToDigits } from "./digit";

type MultTable = {
  // A*B = [Tens, Ones]
  "11": ["0", "1"];
  "12": ["0", "2"];
  "13": ["0", "3"];
  "14": ["0", "4"];
  "15": ["0", "5"];
  "16": ["0", "6"];
  "17": ["0", "7"];
  "18": ["0", "8"];
  "19": ["0", "9"];
  "22": ["0", "4"];
  "23": ["0", "6"];
  "24": ["0", "8"];
  "25": ["1", "0"];
  "26": ["1", "2"];
  "27": ["1", "4"];
  "28": ["1", "6"];
  "29": ["1", "8"];
  "33": ["0", "9"];
  "34": ["1", "2"];
  "35": ["1", "5"];
  "36": ["1", "8"];
  "37": ["2", "1"];
  "38": ["2", "4"];
  "39": ["2", "7"];
  "44": ["1", "6"];
  "45": ["2", "0"];
  "46": ["2", "4"];
  "47": ["2", "8"];
  "48": ["3", "2"];
  "49": ["3", "6"];
  "55": ["2", "5"];
  "56": ["3", "0"];
  "57": ["3", "5"];
  "58": ["4", "0"];
  "59": ["4", "5"];
  "66": ["3", "6"];
  "67": ["4", "2"];
  "68": ["4", "8"];
  "69": ["5", "4"];
  "77": ["4", "9"];
  "78": ["5", "6"];
  "79": ["6", "3"];
  "88": ["6", "4"];
  "89": ["7", "2"];
  "99": ["8", "1"];
};

type DigitMult<T extends Digit, U extends Digit> = T extends "0"
  ? ["0", "0"]
  : U extends "0"
  ? ["0", "0"]
  : `${T}${U}` extends keyof MultTable
  ? MultTable[`${T}${U}`]
  : `${U}${T}` extends keyof MultTable
  ? MultTable[`${U}${T}`]
  : never;

type BounceNx1<
  T extends Digit[],
  U extends Digit,
  Carry extends Digit,
  Multiplied extends [Digit, Digit],
  Acc extends Digit[],
  MultPlusCarry extends [Digit, Digit] = DigitAdder<Multiplied[1], Carry, "0">,
  NewDigit extends Digit = MultPlusCarry[1],
  NewCarry extends Digit = DigitAdder<MultPlusCarry[0], Multiplied[0], "0">[1]
> = MultNx1<T, U, NewCarry, [NewDigit, ...Acc]>;

type BounceNx1NoCarry<
  T extends Digit[],
  U extends Digit,
  Multiplied extends [Digit, Digit],
  Acc extends Digit[]
> = MultNx1<T, U, Multiplied[0], [Multiplied[1], ...Acc]>;

type MultNx1<
  T extends Digit[],
  U extends Digit,
  Carry extends Digit = "0",
  Acc extends Digit[] = []
> = T extends []
  ? Carry extends "0"
    ? Acc
    : [Carry, ...Acc]
  : T extends [...infer T_ extends Digit[], infer Tn extends Digit]
  ? Carry extends "0"
    ? BounceNx1NoCarry<T_, U, DigitMult<Tn, U>, Acc>
    : BounceNx1<T_, U, Carry, DigitMult<Tn, U>, Acc>
  : never;

type MultNxM<
  T extends Digit[],
  U extends Digit[],
  Shift extends "0"[] = [],
  Acc extends Digit[][] = []
> = U extends []
  ? Acc
  : U extends [...infer U_ extends Digit[], infer Un extends Digit]
  ? MultNxM<T, U_, [...Shift, "0"], [...Acc, [...MultNx1<T, Un>, ...Shift]]>
  : never;

export type MultiplyDigits<T extends Digit[], U extends Digit[]> = SumDigits<
  MultNxM<T, U>
>;

export type Multiply<
  T extends `${number}`,
  U extends `${number}`
> = DropLeadingZero<Join<MultiplyDigits<ToDigits<T>, ToDigits<U>>, "0">>;

