import { Digit, DropLeadingZero, Join, ToDigits } from "./digit";

type AdderTable = {
  // A+B+C = [Carry, Sum]
  "000": ["0", "0"];
  "010": ["0", "1"];
  "020": ["0", "2"];
  "030": ["0", "3"];
  "040": ["0", "4"];
  "050": ["0", "5"];
  "060": ["0", "6"];
  "070": ["0", "7"];
  "080": ["0", "8"];
  "090": ["0", "9"];
  "110": ["0", "2"];
  "120": ["0", "3"];
  "130": ["0", "4"];
  "140": ["0", "5"];
  "150": ["0", "6"];
  "160": ["0", "7"];
  "170": ["0", "8"];
  "180": ["0", "9"];
  "190": ["1", "0"];
  "220": ["0", "4"];
  "230": ["0", "5"];
  "240": ["0", "6"];
  "250": ["0", "7"];
  "260": ["0", "8"];
  "270": ["0", "9"];
  "280": ["1", "0"];
  "290": ["1", "1"];
  "330": ["0", "6"];
  "340": ["0", "7"];
  "350": ["0", "8"];
  "360": ["0", "9"];
  "370": ["1", "0"];
  "380": ["1", "1"];
  "390": ["1", "2"];
  "440": ["0", "8"];
  "450": ["0", "9"];
  "460": ["1", "0"];
  "470": ["1", "1"];
  "480": ["1", "2"];
  "490": ["1", "3"];
  "550": ["1", "0"];
  "560": ["1", "1"];
  "570": ["1", "2"];
  "580": ["1", "3"];
  "590": ["1", "4"];
  "660": ["1", "2"];
  "670": ["1", "3"];
  "680": ["1", "4"];
  "690": ["1", "5"];
  "770": ["1", "4"];
  "780": ["1", "5"];
  "790": ["1", "6"];
  "880": ["1", "6"];
  "890": ["1", "7"];
  "990": ["1", "8"];
  "001": ["0", "1"];
  "011": ["0", "2"];
  "021": ["0", "3"];
  "031": ["0", "4"];
  "041": ["0", "5"];
  "051": ["0", "6"];
  "061": ["0", "7"];
  "071": ["0", "8"];
  "081": ["0", "9"];
  "091": ["1", "0"];
  "111": ["0", "3"];
  "121": ["0", "4"];
  "131": ["0", "5"];
  "141": ["0", "6"];
  "151": ["0", "7"];
  "161": ["0", "8"];
  "171": ["0", "9"];
  "181": ["1", "0"];
  "191": ["1", "1"];
  "221": ["0", "5"];
  "231": ["0", "6"];
  "241": ["0", "7"];
  "251": ["0", "8"];
  "261": ["0", "9"];
  "271": ["1", "0"];
  "281": ["1", "1"];
  "291": ["1", "2"];
  "331": ["0", "7"];
  "341": ["0", "8"];
  "351": ["0", "9"];
  "361": ["1", "0"];
  "371": ["1", "1"];
  "381": ["1", "2"];
  "391": ["1", "3"];
  "441": ["0", "9"];
  "451": ["1", "0"];
  "461": ["1", "1"];
  "471": ["1", "2"];
  "481": ["1", "3"];
  "491": ["1", "4"];
  "551": ["1", "1"];
  "561": ["1", "2"];
  "571": ["1", "3"];
  "581": ["1", "4"];
  "591": ["1", "5"];
  "661": ["1", "3"];
  "671": ["1", "4"];
  "681": ["1", "5"];
  "691": ["1", "6"];
  "771": ["1", "5"];
  "781": ["1", "6"];
  "791": ["1", "7"];
  "881": ["1", "7"];
  "891": ["1", "8"];
  "991": ["1", "9"];
};

export type DigitAdder<
  T extends Digit,
  U extends Digit,
  Carry extends "1" | "0"
> = `${T}${U}${Carry}` extends keyof AdderTable
  ? AdderTable[`${T}${U}${Carry}`]
  : `${U}${T}${Carry}` extends keyof AdderTable
  ? AdderTable[`${U}${T}${Carry}`]
  : never;

type Bounce<
  T extends Digit[],
  U extends Digit[],
  Added extends ["0" | "1", Digit],
  Acc extends Digit[]
> = Adder<T, U, Added[0], [Added[1], ...Acc]>;

export type Adder<
  T extends Digit[],
  U extends Digit[],
  Carry extends "1" | "0",
  Acc extends Digit[] = []
> = T extends []
  ? U extends []
    ? // Both T and U are empty, return the result
      Acc extends []
      ? [Carry]
      : Carry extends "0"
      ? Acc
      : [Carry, ...Acc]
    : // T is empty, U is not - continue with 0 as T
    U extends [...infer U_ extends Digit[], infer Un extends Digit]
    ? Bounce<[], U_, DigitAdder<"0", Un, Carry>, Acc>
    : { ERROR: `Something wrong with U` }
  : T extends [...infer T_ extends Digit[], infer Tn extends Digit]
  ? U extends []
    ? // T is not empty, U is - continue with 0 as U
      Bounce<T_, [], DigitAdder<Tn, "0", Carry>, Acc>
    : // Both T and U contain digits
    U extends [...infer U_ extends Digit[], infer Un extends Digit]
    ? Bounce<T_, U_, DigitAdder<Tn, Un, Carry>, Acc>
    : { ERROR: `Something wrong with U` }
  : { ERROR: `Something wrong with T` };

export type Add<T extends `${number}`, U extends `${number}`> = DropLeadingZero<
  Join<Adder<ToDigits<T>, ToDigits<U>, "0">, "0">
>;

type SumWorker<T extends Digit[][], Acc extends Digit[]> = T extends []
  ? Acc
  : T extends [infer T0 extends Digit[], ...infer T_ extends Digit[][]]
  ? // @ts-expect-error
    SumWorker<T_, Adder<T0, Acc, "0">>
  : never;

export type SumDigits<T extends Digit[][]> = SumWorker<T, ["0"]>;
