import { IAdListModel } from '../model/IAdListModel';

export interface IGetListAdRelevantQuery {
  execute(): Promise<Readonly<Array<IAdListModel>>>;
}
