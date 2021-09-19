import { readFileSync } from "fs";
import os from "os";
import { InpitParser } from "./parser/parser";
import SmartSolver from "./solvers/SmartSolver/SmartSolver";
import Visualizer from "./visualizer";

const processFile = (path: string) => {
  return readFileSync(path, "utf8").split(os.EOL);
}

console.log("Working directory: " + process.cwd())

const inputFilePath = process.argv.length > 2 ? process.argv[2]: "samples\\sample1.txt"
console.log(`Reading file : ${inputFilePath}`);
const lines = processFile(inputFilePath.toString());
const parser = new InpitParser({ nodataCharacter: "0" });

const input = parser.parse(lines);
Visualizer.printBoard(input);
const solver = SmartSolver.init(input);
const result = solver.getSolutions();
if (result.length === 0) {
  console.error("No solutions found");
} else {
  result.forEach((s, i) => {
    console.log("");
    console.log(`Printing solution ${i+1}`);
    console.log("");
    Visualizer.print(s, true);
  })
}
