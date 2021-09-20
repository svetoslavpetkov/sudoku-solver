import { readFile } from "fs/promises";
import os from "os";
import FileAdapterFactory from "./fileAdapters/FileAdapterFactory";
import { InpitParser } from "./parser/parser";
import SmartSolver from "./solvers/SmartSolver/SmartSolver";
import Visualizer from "./visualizer";



const processFile = async (path: string) => {
  const instance = FileAdapterFactory.getInstance(path);
  return await instance.getContent(); 
}

(async () => {

  
try {
  console.log("Working directory: " + process.cwd())
  
  const inputFilePath = process.argv.length > 2 ? process.argv[2]: "samples\\sample1.gif";
  const fullPath = process.cwd() + "\\" + inputFilePath;
  console.log(`Reading file : ${fullPath}`);
  const lines = await processFile(fullPath.toString());
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
} catch (e: any) {
  console.error(e.message);
}

})();

