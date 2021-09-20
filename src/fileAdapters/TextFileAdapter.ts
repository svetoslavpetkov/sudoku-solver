import { readFile } from "fs/promises";
import os from "os";

import { IFileAdapter } from "./IFileAdapter";

export default class TextFileAdapter implements IFileAdapter {
  constructor(readonly path: string) {}
  async getContent(): Promise<string[]> {
    const content = await readFile(this.path, "utf8");
    return content.split(os.EOL);
  }
}
