import { createWorker } from 'tesseract.js';
import { IFileAdapter } from "./IFileAdapter";

export default class ImageFileAdapter implements IFileAdapter {

  constructor(readonly path: string) {}

  async getContent(): Promise<string[]> {
    try {
      const worker = createWorker({
        logger: m => console.log(m),
        errorHandler: (e) => console.log("error", e),
      });
  
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
  
      const raw = await worker.readText(this.path);//await worker.recognize(this.path);
      console.log("raw text " + raw.data.text);
    } catch(err) {
      const variable = err as any;
      console.log(`Error : ${variable.message}`);
      console.log("Error", variable);
    }
    return [];
  }

}