import Guard from "../../../util/guard";
import { IPosittion } from "./IPosittion";
import SolveStep from "./SolveStep";
import SudokuCell from "./SudokuCell";

export default class CellSequence {
  constructor(public readonly posittions: Array<IPosittion>, public readonly cells: Array<Array<SudokuCell>>) {};


  public iterateCells(func: (cell: SudokuCell, posittion: IPosittion) => boolean ): void {
    for (let index = 0; index < this.posittions.length; index++) {
      const p = this.posittions[index];
      const cell = this.cells[p.row][p.col];
      if (!func(cell, p)) {
        break;
      }
    }
  }

  public isValid() {
    const occurances = [0,0,0,0,0,0,0,0,0];
    let isValid = true;

    this.iterateCells((cell) => {
      isValid = isValid && cell.isValid();
      if (!isValid) {
        return false;
      }
      if(cell.hasValue()) {
        const value = Guard.ensure(cell.getValue(), "Cell must have value");
        const valueIndex = value -1;
        occurances[valueIndex] = occurances[valueIndex] + 1;
      }
      return true;
    });

    if (isValid) {
      const occurence = occurances.find(v => v > 1);
      if (occurence) {
        isValid = false;
      }
    }

    return isValid;
  }

  public isSolved(): boolean {
    let isSolved = true;
    this.iterateCells(cell => {
      isSolved = isSolved && cell.hasValue();
      return isSolved;
    });
    return isSolved;
  }

  public getNextValue(): SolveStep | undefined {
    let result: SolveStep | undefined = undefined;
    
    this.iterateCells((cell, posittion) => {
      if( !cell.hasValue() && cell.getPossibleValues().length === 1) {
        result = new SolveStep(posittion.row, posittion.col, cell.getPossibleValues()[0]);
        return false;
      }
      return true;
    });

    return result;
  }

  public removePossibleValue(value: number): void {
    this.iterateCells((cell) => {
      cell.removePossibleValue(value);
      return true;
    });
  }
}