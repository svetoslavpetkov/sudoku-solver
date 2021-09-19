import SudokuCell from "./SudokuCell"

const allPossibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

describe("SudokuCell.create", () => {

  it("Shoudl throw excpetion provided invalid value", () => {
    expect(() => { SudokuCell.create(28) }).toThrowError(/Ivalid value input./);
  });

  it("Should work with value undefined", () => {
    const result = SudokuCell.create(undefined);

    expect(result.getValue()).toBeUndefined();
    expect(result.getPossibleValues()).toEqual(allPossibleValues);
  });

  it("Should manipulate possible values when invoked with real value", () => {
    const value = 5;
    const result = SudokuCell.create(value);

    expect(result.getValue()).toBe(5);
    expect(result.getPossibleValues()).toEqual([]);
  })
});

describe("SudokuCell.setValue", () => {

  it("Should thwor excpetion when value is invalid", () => {
    const cell = SudokuCell.create(undefined);
    expect(() => { cell.setValue(15) }).toThrowError(/Ivalid value input./);
  });

  it("Should throw exception when already having a value", () => {
    const cell = SudokuCell.create(5);
    expect(() => { cell.setValue(6) }).toThrowError(/Cannot set value to cell, cell already has value/);
  });

  it("Should set value and manipulate the possible values", () => {
    const cell = SudokuCell.create(undefined);
    const value = 5;

    cell.setValue(value);

    expect(cell.getValue()).toBe(5);
    expect(cell.getPossibleValues()).toEqual([]);
  });
});

describe("SudokuCell.removePossibleValue", () => {
  it("should remove the provided value", () => {
    const value = 5;
    const expectedPossibleValues = allPossibleValues.filter(v => v !== value);

    const cell = SudokuCell.create(undefined);
    cell.removePossibleValue(value);

    expect(cell.getPossibleValues()).toEqual(expectedPossibleValues);
  });

  it("should do nothing if the provided value is already removed", () => {
    const value = 5;
    const expectedPossibleValues = allPossibleValues.filter(v => v !== value);

    const cell = SudokuCell.create(undefined);
    cell.removePossibleValue(value);
    cell.removePossibleValue(value);

    expect(cell.getPossibleValues()).toEqual(expectedPossibleValues);
  });

  it("should throw an exception if input is invalid", () => {
    const value = 15;

    const cell = SudokuCell.create(undefined);

    expect(() => {
      cell.removePossibleValue(value);
    }).toThrow(/Ivalid value input./);
  });
});


describe("SudokuCell.isValid", () => {
  it("given no value and no possible values should return false", () => {
    const cell = SudokuCell.create(undefined);
    allPossibleValues.forEach(v => cell.removePossibleValue(v));

    expect(cell.isValid()).toBe(false);
  });

  it("given no value and at least one possible value should return true", () => {
    const cell = SudokuCell.create(undefined);
    [2, 3, 4, 5, 6, 7, 8, 9].forEach(v => {
        cell.removePossibleValue(v)
    });

    expect(cell.getPossibleValues()).toHaveLength(1);
    expect(cell.isValid()).toBe(true);
  });

  it("given a value return true", () => {
    const cell = SudokuCell.create(6);

    expect(cell.getPossibleValues()).toHaveLength(0);
    expect(cell.isValid()).toBe(true);
    expect(cell.hasValue()).toBe(true);
  });
});
