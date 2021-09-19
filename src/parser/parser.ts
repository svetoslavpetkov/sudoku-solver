import { IParser } from "../model/IParser"
import { ISudokuInput } from "../model/ISudokuInput";

import Guard from "../util/guard";

export class InpitParser implements IParser<Array<string>> {

  constructor(readonly settings: {nodataCharacter: string}) {
    Guard.should(this.settings.nodataCharacter.length === 1, "No data character should be one character");
  }

  parse(lines: Array<string>): ISudokuInput {
    Guard.should(lines.length === 9, `Wrong input, 9 rows are required, but ${lines.length} were provided`);
    const rows: Array<Array<number | undefined>> = lines.map((line, index) => {
      const inputLine = line.trim();
      Guard.should(inputLine.length === 9, `Inorrect input at line ${index + 1}. Line unput length should be 9 digits, but it is ${inputLine.length}`);
      const row: Array<number | undefined> = [];
      for (let col = 0; col < line.length; col++) {
        const element = line[col];
        const num = parseInt(element);
        const isValid = !isNaN(num) || element === this.settings.nodataCharacter;
        Guard.should(isValid, `Invalid input provided at row ${index + 1} and col ${col + 1}. Original value: ${element}`);
        const isEmpty = element === this.settings.nodataCharacter
        row.push(isEmpty ? undefined : num);
      }
      return row;
    });

    return {
      rows,
    }
  }
}
