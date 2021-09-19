import { IPosittion } from "./IPosittion"
import SudokuQuadrant from "./SudokuQuadrant";


describe("SudokuQuadrant.isInQuadrant" , () => {
  const inputs = [
    { name: "above the quadrant", row: 2, col: 4, expected: false },
    { name: "to the left of the quadrant", row: 4, col: 2, expected: false },
    { name: "to the right of the quadrant", row: 4, col: 6, expected: false },
    { name: "bellow the quadrant", row: 6, col: 4, expected: false },
    { name: "in the quadrant on top", row: 3, col: 4, expected: true },
    { name: "in the quadrant on left bodder", row: 4, col: 3, expected: true },
    { name: "in the quadrant on right bodder", row: 3, col: 5, expected: true },
    { name: "in the quadrant on bottom", row: 5, col: 4, expected: true },
  ]

  inputs.forEach(i => it(i.name, () => {
    const topLeft: IPosittion = { row: 3, col: 3 };
    const bottomRight: IPosittion = { row: 5, col: 5 };

    const quadrant = SudokuQuadrant.create(topLeft, bottomRight);
    const result = quadrant.isInQuadrant(i);
    expect(result).toBe(i.expected);
  }));
})
