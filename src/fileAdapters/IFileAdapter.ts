export interface IFileAdapter {
  getContent(): Promise<Array<string>>;
}