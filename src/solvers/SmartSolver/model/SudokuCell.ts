import Guard from "../../../util/guard";

const allPossibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const validateValue = (value: number | undefined): void => {
  if (value === undefined) {
    return;
  }

  Guard.should( 1 <= value && value <= 9, `Ivalid value input. It should be between 1 and 9. Prvided value: ${value}`);
}

export default class SudokuCell {

  public static create(value: number | undefined): SudokuCell {
    validateValue(value);
    const result = new SudokuCell(undefined, [...allPossibleValues]);
    if (value != undefined) {
      result.setValue(value);
    }
    return result;
  }

  protected constructor(protected  value: number | undefined, protected possibleValues: Array<number>) {}

  public hasValue(): boolean {
    return this.value !== undefined;
  }

  public getValue(): number | undefined {
    return this.value;
  }

  public setValue(value: number): void {
    validateValue(value);
    Guard.should(this.value === undefined, `Cannot set value to cell, cell already has value ${value} `);
    this.value = value;
    this.removeAllPossibleValues();
  }

  public getPossibleValues() {
    return this.possibleValues;
  }

  public removePossibleValue(value: number): void {
    validateValue(value);
    const newPossibleValues = this.possibleValues.filter(v => v !== value);
    this.possibleValues = newPossibleValues;
  }

  private removeAllPossibleValues(): void {
    this.possibleValues = [];
  }

  public clone(): SudokuCell {
    return new SudokuCell(this.value, [...this.possibleValues]);
  }

  public isValid(): boolean {
    return this.hasValue() || this.possibleValues.length > 0;
  }

}