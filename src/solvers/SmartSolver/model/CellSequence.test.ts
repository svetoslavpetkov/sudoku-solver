import CellSequence from "./CellSequence";
import { IPosittion } from "./IPosittion";
import SolveStep from "./SolveStep";
import SudokuCell from "./SudokuCell";

class Cell extends SudokuCell {

  public static creatCell(isValid: boolean, value?: number): Cell {
    return new Cell(isValid, value);
  }

  public static valid(value?: number): Cell {
    return Cell.creatCell(true, value);
  }

  public static invalid(value?: number): Cell {
    return Cell.creatCell(false, value);
  }

  constructor(private readonly isValidResult: boolean, value: number | undefined ){
    super(value, []);
  }

  isValid(): boolean {
    return this.isValidResult;
  }
}

const getPosittions = (arr: Array<any>): Array<IPosittion> => {
  return arr.map((v,i) => ({ row: 0, col: i }));
}

const getSequence = (input: Array<SudokuCell>): CellSequence => {
  const posittions = getPosittions(input);
  return new CellSequence(posittions, [ input ]);
}

describe("CellSequence.isValid", () => {
  const valid = Cell.valid;
  const invalid = Cell.invalid;

  it("Having all valid wihout values, shoudl return true", () => {
    const input = [ valid(), valid(), valid(), ];

    const cellSequence = getSequence(input)
    expect(cellSequence.isValid()).toBe(true);
  });

  it("Having all valid with unique values, shoudl return true", () => {
    const input = [ valid(1), valid(2), valid(3), ];

    const cellSequence = getSequence(input)

    expect(cellSequence.isValid()).toBe(true);
  });

  it("Having all valid, but with duplicates, should return false", () => {
    const input = [ valid(1), valid(2), valid(3), valid(1) ];

    const cellSequence = getSequence(input)

    expect(cellSequence.isValid()).toBe(false);
  });

  it("Having one invalid, should return false", () => {
    const input = [ valid(1), valid(2), invalid(), ];

    const cellSequence = getSequence(input)

    expect(cellSequence.isValid()).toBe(false);
  });
});

describe("CellSequence.isSolved", () => {

  const withValue = (res: boolean): SudokuCell => {
    const cell = {
      hasValue: () => { return res;  }
    };
    return cell as SudokuCell;
  }

  const hasValue = () => withValue(true);
  const noValue = () => withValue(false);

  it("Having all with values should return true", () => {
    const input = [ hasValue(), hasValue(), hasValue() ];

    const cellSequence = getSequence(input)

    expect(cellSequence.isSolved()).toBe(true);
  });

  it("Having one noValue cell should return false", () => {
    const input = [ hasValue(), noValue(), hasValue() ];

    const cellSequence = getSequence(input)

    expect(cellSequence.isSolved()).toBe(false);
  });
});

describe("Sequence.getNextValue" , () => {
  const create = (hasValue: boolean, value?: number, possibleValues: Array<number> = [] ): SudokuCell => {
    const cell = {
      hasValue: () => { return hasValue;  },
      getValue: () => { return value; },
      getPossibleValues: () => { return possibleValues; },
    };
    return cell as SudokuCell;
  }

  const hasValue = (val: number) => create(true, val);
  const noValue = (...values: Array<number>) => create(false, undefined, values);

  it("Should return undefinded if all have values", () => {
    const input = [ hasValue(1), hasValue(2), hasValue(3) ];
    const cellSequence = getSequence(input);
    expect(cellSequence.getNextValue()).toBeUndefined();
  });

  it("Should return undefinded if all have more than one possibel values", () => {
    const input = [ noValue(1, 2), noValue(2,3), noValue(1, 3) ];
    const cellSequence = getSequence(input);
    expect(cellSequence.getNextValue()).toBeUndefined();
  });

  it("Should return undefinded if all have more than one possible values or have a value", () => {
    const input = [ noValue(1, 2), noValue(2,3), noValue(1, 3), hasValue(5) ];
    const cellSequence = getSequence(input);
    expect(cellSequence.getNextValue()).toBeUndefined();
  });

  it("Should return undefinded if all have more than one possible values or have a value", () => {
    const input = [ noValue(1, 2), noValue(3), noValue(1, 3), hasValue(5) ];
    const cellSequence = getSequence(input);
    const result = cellSequence.getNextValue();
    expect(result).toEqual(new SolveStep(0, 1, 3));
  });

});
