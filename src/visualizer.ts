 import { ISudokuInput } from "./model/ISudokuInput";
import { ISudokuResult } from "./model/ISudokuResult";
import SolveStep from "./solvers/SmartSolver/model/SolveStep";

const num = (value: number): string => {
  return value.toString().padStart(2, " ");
}
export default class Visualizer {

  static printBoard(input: ISudokuInput) {
    const delimeter = "+---+---+---+"; 
    console.log(delimeter);

    for (let rowIndex = 0; rowIndex < input.rows.length; rowIndex++) {
      const row = input.rows[rowIndex];
      let rowString = "|";
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const element = row[colIndex];
        rowString += element === undefined ? " " : element?.toString();
        if ((colIndex + 1) % 3 === 0) {
          rowString += "|";
        }
      }
      console.log(rowString);
      if ((rowIndex + 1) % 3 === 0) {
        console.log(delimeter);
      }
    }
  }

  static printSteps(steps: Array<SolveStep>) {
    console.log(`Solved in ${steps.length}`);

    steps.forEach((s,i) => {
      console.log(`Step: ${num(i)} row: ${num(s.row + 1)} , col: ${num(s.col + 1)}, found value: ${num(s.value)}`)
    })
  }

  static print(result: ISudokuResult, printSteps: boolean) {
    Visualizer.printBoard(result);
    if(printSteps) {
      this.printSteps(result.steps);
    }
  }

}