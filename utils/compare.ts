import { Digit, ToDigits } from "./digit";

type Foo = `0${Exclude<Digit, "0">}`;

type ComparerTable = {
  // A < B = -1, A = B = 0, A > B = 1
  "00": 0;
  "01": -1;
  "02": -1;
  "03": -1;
  "04": -1;
  "05": -1;
  "06": -1;
  "07": -1;
  "08": -1;
  "09": -1;
  "10": 1;
  "11": 0;
  "12": -1;
  "13": -1;
  "14": -1;
  "15": -1;
  "16": -1;
  "17": -1;
  "18": -1;
  "19": -1;
  "20": 1;
  "21": 1;
  "22": 0;
  "23": -1;
  "24": -1;
  "25": -1;
  "26": -1;
  "27": -1;
  "28": -1;
  "29": -1;
  "30": 1;
  "31": 1;
  "32": 1;
  "33": 0;
  "34": -1;
  "35": -1;
  "36": -1;
  "37": -1;
  "38": -1;
  "39": -1;
  "40": 1;
  "41": 1;
  "42": 1;
  "43": 1;
  "44": 0;
  "45": -1;
  "46": -1;
  "47": -1;
  "48": -1;
  "49": -1;
  "50": 1;
  "51": 1;
  "52": 1;
  "53": 1;
  "54": 1;
  "55": 0;
  "56": -1;
  "57": -1;
  "58": -1;
  "59": -1;
  "60": 1;
  "61": 1;
  "62": 1;
  "63": 1;
  "64": 1;
  "65": 1;
  "66": 0;
  "67": -1;
  "68": -1;
  "69": -1;
  "70": 1;
  "71": 1;
  "72": 1;
  "73": 1;
  "74": 1;
  "75": 1;
  "76": 1;
  "77": 0;
  "78": -1;
  "79": -1;
  "80": 1;
  "81": 1;
  "82": 1;
  "83": 1;
  "84": 1;
  "85": 1;
  "86": 1;
  "87": 1;
  "88": 0;
  "89": -1;
  "90": 1;
  "91": 1;
  "92": 1;
  "93": 1;
  "94": 1;
  "95": 1;
  "96": 1;
  "97": 1;
  "98": 1;
  "99": 0;
};

type CompareDigit<
  T extends Digit,
  U extends Digit
> = `${T}${U}` extends keyof ComparerTable ? ComparerTable[`${T}${U}`] : never;

type Bounce<
  T extends Digit[],
  U extends Digit[],
  Compared extends 0 | 1 | -1
> = Compared extends 0 ? Comparer<T, U> : Compared;

type Comparer<T extends Digit[], U extends Digit[]> = T extends []
  ? 0
  : // We expect T and U to have the same length
  T extends [infer Tn extends Digit, ...infer TRest extends Digit[]]
  ? U extends [infer Un extends Digit, ...infer URest extends Digit[]]
    ? Bounce<TRest, URest, CompareDigit<Tn, Un>>
    : never
  : never;

type PadStart<
  T extends Digit[],
  U extends Digit[],
  TAcc extends Digit[] = [],
  UAcc extends Digit[] = []
> =
  // If T is empty, pad it with 0 until it is the same length as U
  T extends []
    ? U extends []
      ? [TAcc, UAcc]
      : U extends [...infer URest extends Digit[], infer Un extends Digit]
      ? PadStart<T, URest, ["0", ...TAcc], [Un, ...UAcc]>
      : U extends [infer Un extends Digit]
      ? [["0", ...TAcc], [Un, ...UAcc]]
      : never
    : // If U is empty, pad it with 0 until it is the same length as U
    U extends []
    ? T extends [...infer TRest extends Digit[], infer Tn extends Digit]
      ? PadStart<TRest, U, [Tn, ...TAcc], ["0", ...UAcc]>
      : T extends [infer Tn extends Digit]
      ? [[Tn, ...TAcc], ["0", ...UAcc]]
      : never
    : // Both are non-empty, recurse further
    T extends [...infer TRest extends Digit[], infer Tn extends Digit]
    ? U extends [...infer URest extends Digit[], infer Un extends Digit]
      ? PadStart<TRest, URest, [Tn, ...TAcc], [Un, ...UAcc]>
      : U extends [infer Un extends Digit]
      ? PadStart<T, [], TAcc, [Un, ...UAcc]>
      : never
    : T extends [infer Tn extends Digit]
    ? U extends [...infer URest extends Digit[], infer Un extends Digit]
      ? PadStart<[], URest, [Tn, ...TAcc], [Un, ...UAcc]>
      : U extends [infer Un extends Digit]
      ? [[Tn, ...TAcc], [Un, ...UAcc]]
      : never
    : never;

export type CompareDigits<
  T extends Digit[],
  U extends Digit[],
  Padded extends [Digit[], Digit[]] = PadStart<T, U>
> = Comparer<Padded[0], Padded[1]>;

export type Compare<T extends `${number}`, U extends `${number}`> = CompareDigits<
  ToDigits<T>,
  ToDigits<U>
>;
