import { IAdListModel } from './IAdListModel';

export interface IGetListAdQuery {
  execute(): Promise<Readonly<Array<IAdListModel>>>;
}
