export interface IRepository<T> {
  getAll(): Promise<Array<T>>;

  saveMany(docs: T[]): Promise<void>;
}
