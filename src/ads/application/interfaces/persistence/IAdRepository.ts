import { IRepository } from '../../../../shared/persistence/interfaces/IRepository';
import { Ad } from '../../../domain/Ad';

export interface IAdRepository extends IRepository<Ad> {
  saveToFile(docs: Readonly<Ad[]>): Promise<void>;
}
