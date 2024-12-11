`input.ts` was not shared to GitHub according to the Advent of Code rules. It consists of 33 types called `Input0`, `Input1`, ... which all have the following format:

```ts
export type Input0 = {
  "13282106": ["9", "7", "244", "864", "689", "9"];
  "16028321": ["10", "437", "7", "727", "385", "8", "1"];
  // ...23 more lines
};

// ...32 more input types
```

Each line contains the test number as the dictionary key and the numbers as an array of strings. Each type is limited to 25 lines, in order to avoid TypeScript's type depth limit.
