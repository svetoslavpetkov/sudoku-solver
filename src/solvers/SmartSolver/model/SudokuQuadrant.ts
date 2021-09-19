import CellSequence from "./CellSequence";
import { IPosittion } from "./IPosittion";
import SolveStep from "./SolveStep";
import SudokuCell from "./SudokuCell";

export default class SudokuQuadrant {

  private readonly posittions: Array<IPosittion>;
  public static create(topLeft: IPosittion, bottomRight: IPosittion): SudokuQuadrant {
    return new SudokuQuadrant(topLeft, bottomRight);
  }

  constructor(public readonly topLeft: IPosittion, public readonly bottomRight: IPosittion) {
    const posittions : Array<IPosittion> = [];

    for (let row = this.topLeft.row; row <= this.bottomRight.row; row++) {
      for (let col = this.topLeft.col; col <= this.bottomRight.col; col++) {
        posittions.push({ row, col });
      }
    }

    this.posittions = posittions;
  }

  private getCellSequence(cells: Array<Array<SudokuCell>>): CellSequence {
    return new CellSequence(this.posittions, cells);
  }

  isInQuadrant(posittion: IPosittion): boolean {
    return ( this.topLeft.row <= posittion.row && posittion.row <= this.bottomRight.row )
     && (this.topLeft.col <= posittion.col && posittion.col <= this.bottomRight.col);
  }

  markValueAsFound(foundValue: SolveStep, board: Array<Array<SudokuCell>>): void {
    this.getCellSequence(board).removePossibleValue(foundValue.value);
  }

  isSolved(board: Array<Array<SudokuCell>>): boolean {
    return this.getCellSequence(board).isSolved();
  }

  isValid(board: Array<Array<SudokuCell>>): boolean {
    return this.getCellSequence(board).isValid();
  }

  getNextValue(board: Array<Array<SudokuCell>>): SolveStep | undefined {
    return this.getCellSequence(board).getNextValue();
  }

  clone(): SudokuQuadrant {
    return new SudokuQuadrant(this.topLeft, this.bottomRight);
  }
}
