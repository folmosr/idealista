import { IEntity } from '../domain/IEntity';
import { IRepository } from './interfaces/IRepository';

export class Repository<T extends IEntity> implements IRepository<T> {
  constructor() {}

  saveMany(docs: T[]): Promise<void> {
    return Promise.resolve();
  }

  getAll(): Promise<Array<T>> {
    return Promise.resolve([]);
  }
}
