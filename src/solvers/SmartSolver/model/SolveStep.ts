import { IPosittion } from "./IPosittion";

export default class SolveStep implements IPosittion {
  constructor(public readonly row: number, public readonly col: number, public readonly value: number) {}
} 