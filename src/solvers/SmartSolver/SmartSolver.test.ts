import SmartSolver from "./SmartSolver"

const cases1 = {
  input: [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0]
  ],
  output: [
    [4,3,5,2,6,9,7,8,1],
    [6,8,2,5,7,1,4,9,3],
    [1,9,7,8,3,4,5,6,2],
    [8,2,6,1,9,5,3,4,7],
    [3,7,4,6,8,2,9,1,5],
    [9,5,1,7,4,3,6,2,8],
    [5,1,9,3,2,6,8,7,4],
    [2,4,8,9,5,7,1,3,6],
    [7,6,3,4,1,8,2,5,9]
  ],
}

const cases2 = {
  input: [
    [0, 2, 0, 3, 5, 0, 0, 8, 4],
    [0, 0, 0, 4, 6, 0, 0, 5, 7],
    [0, 0, 0, 2, 0, 7, 0, 1, 0],
    [0, 0, 5, 0, 4, 0, 8, 0, 2],
    [0, 6, 9, 0, 2, 8, 0, 0, 0],
    [0, 0, 8, 0, 0, 0, 1, 0, 6],
    [7, 3, 0, 8, 0, 5, 4, 2, 0],
    [9, 0, 0, 7, 3, 0, 0, 6, 1],
    [0, 5, 0, 0, 9, 2, 0, 0, 8]
  ],
  output: [
    [6,2,7,3,5,1,9,8,4],
    [8,1,3,4,6,9,2,5,7],
    [5,9,4,2,8,7,6,1,3],
    [1,7,5,9,4,6,8,3,2],
    [3,6,9,1,2,8,7,4,5],
    [2,4,8,5,7,3,1,9,6],
    [7,3,6,8,1,5,4,2,9],
    [9,8,2,7,3,4,5,6,1],
    [4,5,1,6,9,2,3,7,8]
  ]
}

const getInput = (input: Array<Array<number>>) => {
  return input.map(row => {
    return row.map(v => v === 0 ? undefined : v);
  });
}

describe("Smart Solver works", () => {
  it("case1", () => {
    const solver = SmartSolver.init({ rows: getInput(cases1.input) });
    const result = solver.getSolutions();
    expect(result).toHaveLength(1);
    expect(result[0].rows).toEqual(cases1.output); 
  })

  it("case2", () => {
    const solver = SmartSolver.init({ rows: getInput(cases2.input) });
    const result = solver.getSolutions();
    expect(result).toHaveLength(1);
    expect(result[0].rows).toEqual(cases2.output); 
  })
})
