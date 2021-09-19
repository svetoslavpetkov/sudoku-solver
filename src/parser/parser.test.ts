import { InpitParser } from "./parser";
import os from "os";

const getParser = (noDataChar: string = " "):InpitParser => {
  return new InpitParser({ nodataCharacter: noDataChar });
}

describe("parse.parse", () => {
  it("should throw error if lines are more than 9", () => {
    const input = Array.from({length: 10}, (_, i) => i + 1).map(n => n.toString());
    expect(() => { getParser().parse(input) }).toThrowError(/Wrong input, 9 rows are required, but 10 were/);
  });

  it("should throw error if lines are less than 9", () => {
    const input = ["1"];
    expect(() => { getParser().parse(input) }).toThrowError(/Wrong input, 9 rows are required, but 1 were/);
  });

  it("should throw an error if a line is more than 9 characters", () => {
    const input = Array.from({length: 9}, (_, i) => i + 1).map((n) => {
      return n === 8 ? "1234567899" : "123456789";
    });
    expect(() => { getParser().parse(input) }).toThrowError(/Inorrect input at line 8. Line unput length should be 9 digits/);
  })

  it("should throw an error if a line is less than 9 characters", () => {
    const input = Array.from({length: 9}, (_, i) => i + 1).map((n) => {
      return n === 7 ? "12345678" : "123456789";
    });
    expect(() => { getParser().parse(input) }).toThrowError(/Inorrect input at line 7. Line unput length should be 9 digits/);
  })

  it("should throw an error if line contians none number character", () => {
    const input = Array.from({length: 9}, (_, i) => i + 1).map((n) => {
      return n === 3 ? "12345Z780" : "123456789";
    });
    expect(() => { getParser().parse(input) }).toThrowError("Invalid input provided at row 3 and col 6. Original value: Z");
  })

  it("should parse correct", () => {
    const input = [
      "100000000",
      "020000000",
      "003000000",
      "000400000",
      "000050000",
      "000006000",
      "000000700",
      "000000080",
      "000000009",
  ];
    const expected = [
      [1,0,0,0,0,0,0,0,0],
      [0,2,0,0,0,0,0,0,0],
      [0,0,3,0,0,0,0,0,0],
      [0,0,0,4,0,0,0,0,0],
      [0,0,0,0,5,0,0,0,0],
      [0,0,0,0,0,6,0,0,0],
      [0,0,0,0,0,0,7,0,0],
      [0,0,0,0,0,0,0,8,0],
      [0,0,0,0,0,0,0,0,9],
    ].map(a => a.map(n => n === 0 ? undefined : n));
    const result = getParser("0").parse(input);
    expect(result.rows).toEqual(expected);
  });
})