import { IAdListModel } from './IAdListModel';

export interface IGetListAdQuery {
  Execute(): Promise<Readonly<Array<IAdListModel>>>;
}
