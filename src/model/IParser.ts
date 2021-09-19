import { ISudokuInput } from "./ISudokuInput";

export interface IParser<T> {
    parse(input: T): ISudokuInput;
}