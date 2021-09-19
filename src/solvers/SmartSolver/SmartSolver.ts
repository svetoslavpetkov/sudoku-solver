import { ISolver } from "../../model/ISolver";
import { ISudokuInput } from "../../model/ISudokuInput";
import { ISudokuResult } from "../../model/ISudokuResult";
import Guard from "../../util/guard";
import CellSequence from "./model/CellSequence";
import { IPosittion } from "./model/IPosittion";
import SolveStep from "./model/SolveStep";
import SudokuCell from "./model/SudokuCell";
import SudokuQuadrant from "./model/SudokuQuadrant";
const allpossibelValues = [0, 1, 2, 3, 4, 5, 6, 7, 8];
export default class SmartSolver implements ISolver {
  
  static init(input: ISudokuInput): SmartSolver {
    const cells = input.rows.map(r => {
      return r.map(v => SudokuCell.create(undefined))
    });

    const quadrants = [0,1,2].flatMap(row => {
      return [0, 1, 2].map(col => {
        const topLeft = { row: row * 3, col: col * 3 };
        const bottomRight = { row: topLeft.row + 2, col: topLeft.col + 2 };
        return SudokuQuadrant.create(topLeft, bottomRight);
      })
    });

    const result = new SmartSolver(cells, [], quadrants);

    input.rows.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value !== undefined) {
          result.addFoundValue({ row: rowIndex, col: colIndex, value: value }, true);
        }
      });
    });

    return result;
  }


  private readonly rows: Array<CellSequence>;
  private readonly cols: Array<CellSequence>;

  constructor(
    private readonly cells: Array<Array<SudokuCell>>,
    private readonly solveSteps: Array<SolveStep>,
    private readonly quadrants: Array<SudokuQuadrant>
  ) {
    //init
    this.rows = allpossibelValues.map(r => {
      const possittions = allpossibelValues.map(c => ({ row: r, col: c }));
      return new CellSequence(possittions, this.cells);
    });

    this.cols = allpossibelValues.map(c => {
      const possittions = allpossibelValues.map(r => ({ row: r, col: c }));
      return new CellSequence(possittions, this.cells);
    });
  }

  getQuadrant(posittion: IPosittion): SudokuQuadrant {
    const result = this.quadrants.find(q => q.isInQuadrant(posittion));
    return Guard.ensure(result, `Cannot find quadrant for row ${posittion.row} and col ${posittion.col}`);
  }

  addFoundValue(solution: SolveStep, isInitial = false) {
    this.rows[solution.row].removePossibleValue(solution.value);
    this.cols[solution.col].removePossibleValue(solution.value);
    this.getQuadrant(solution).markValueAsFound(solution, this.cells);

    this.cells[solution.row][solution.col].setValue(solution.value);

    if (!isInitial) {
      this.solveSteps.push(solution);
    }
  }

  isValid(): boolean {
    const invalidRow = this.rows.find(r => !r.isValid());
    if (invalidRow) {
      return false;
    }

    const invalidCol = this.cols.find(c => !c.isValid());
    if (invalidCol) {
      return false;
    }

    const invalidQuadrant = this.quadrants.find(q => !q.isValid(this.cells));
    if (invalidQuadrant) {
      return false;
    }
    return true;
  }

  isSolved(): boolean {
    let isSovled = true;
    for (let index = 0; index < this.rows.length; index++) {
      const row = this.rows[index];
      isSovled = isSovled && row.isSolved();
      if (!isSovled) {
        break;
      }
    }
    return isSovled;
  }

  getNextValue(): SolveStep | undefined {
    let result : SolveStep | undefined;

    const rowsAndCols = [...this.rows, ...this.cols];
    for (let index = 0; index < rowsAndCols.length; index++) {
      const element = rowsAndCols[index];
      result = element.getNextValue();
      if (result) {
        return result
      }
    }

    for (let index = 0; index < this.quadrants.length; index++) {
      const quadrant = this.quadrants[index];
      result = quadrant.getNextValue(this.cells);
      if (result) {
        return result
      }
    }

    return result;
  } 

  getSubSolutions(): ISudokuResult[] {
    let steps: Array<SolveStep> = [];

    for (let rowIdx = 0; rowIdx < this.cells.length; rowIdx++) {
      const row = this.cells[rowIdx];
      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        const cell = row[colIdx];
        if (!cell.hasValue()) {
          const solveSteps = cell.getPossibleValues().map(v => new SolveStep(rowIdx,colIdx,v));
          steps = solveSteps;
          break;
        }
      }

      if (steps.length > 0) {
        break;
      }
    }

    return steps.flatMap( s => {
      const subSolver = this.clone();
      subSolver.addFoundValue(s);
      return subSolver.getSolutions();
    });
  }

  clone(): SmartSolver {
    const cells = this.cells.map(r => r.map(c => c.clone()));
    const quadrants = this.quadrants.map(q => q.clone());
    const solveSteps = [...this.solveSteps];
    return new SmartSolver(cells, solveSteps, quadrants);
  }

  getSolutions(): ISudokuResult[] {
    do {
      if (!this.isValid()) {
        return [];
      }
      if (this.isSolved()) {
        return [ this.getResult()];
      }

      const nextValue = this.getNextValue();
      if (nextValue === undefined) {
        // spread subsolvers
        return this.getSubSolutions();
      } else {
        this.addFoundValue(nextValue);
      }

    } while (true)
  }

  private getResult(): ISudokuResult {
    const rows = this.cells.map((r, rIndex) => {
      return r.map((c, cIndex) => Guard.ensure(c.getValue(), `Cannot get result, no value for rIndex ${rIndex} and cIndex ${cIndex}`))
    })
    return {
      rows,
      iterations: 0,
      steps: this.solveSteps,
    };
  }

}