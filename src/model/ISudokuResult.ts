import SolveStep from "../solvers/SmartSolver/model/SolveStep";
import { ISudokuInput } from "./ISudokuInput";

export interface ISudokuResult extends ISudokuInput {
    iterations: number;
    steps: Array<SolveStep>;
}