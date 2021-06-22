import { IAdListModel } from '../model/IAdListModel';

export interface IGetListAdQuery {
  execute(): Promise<Readonly<Array<IAdListModel>>>;
}
