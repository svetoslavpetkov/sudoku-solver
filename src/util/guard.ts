export default class Guard {
  static should(rule: boolean, message: string): void {
    if (!rule) {
      throw new Error(message);
    }
  }

  static exists(obj: any, message: string): void {
    Guard.should(obj !== undefined && obj !== null, message);
  }

  static ensure<T>(value: T | undefined, message: string): T {
    if (value !== undefined) {
      return value as T;
    }

    throw new Error(message);
  }
}
