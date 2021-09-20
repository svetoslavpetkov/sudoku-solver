import { IFileAdapter } from "./IFileAdapter";
import ImageFileAdapter from "./ImageFileAdapter";
import TextFileAdapter from "./TextFileAdapter";

type AdapterCosntructor = (path: string) => IFileAdapter;

interface IExtensionMapping {
  extensions: Array<string>;
  adapterCreator: AdapterCosntructor
}

const adapterMap: Array<IExtensionMapping> = [
  {
    extensions: ["txt"],
    adapterCreator: (path: string) => new TextFileAdapter(path)
  },
  {
    extensions: ["gif", "png"],
    adapterCreator: (path: string) => new ImageFileAdapter(path)
  }
]

export default class FileAdapterFactory {
  private static getExtension(path: string): string {
    const lastIndexOfDot = path.lastIndexOf(".");
    return path.substring(lastIndexOfDot + 1).trim();
  }
 
  static getInstance(path: string): IFileAdapter {
    const extension = FileAdapterFactory.getExtension(path);
    const mapping = adapterMap.find(m => m.extensions.includes(extension));
    if (!mapping) {
      throw new Error(`Cannot find mapping for file extension ${extension}`);
    }
    return mapping.adapterCreator(path);
  }
}
