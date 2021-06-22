import { IAdListModel } from '../model/IAdListModel';

export interface IGetListSortedAdQuery {
  execute(): Promise<Readonly<Array<IAdListModel>>>;
}
