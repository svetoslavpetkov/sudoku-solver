import { ISudokuInput } from "./ISudokuInput";
import { ISudokuResult } from "./ISudokuResult";

export interface ISolver {
    getSolutions(): Array<ISudokuResult>;
}