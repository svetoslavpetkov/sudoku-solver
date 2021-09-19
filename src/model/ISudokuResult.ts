import { ISudokuInput } from "./ISudokuInput";

export interface ISudokuResult extends ISudokuInput {
    iterations: number;
}