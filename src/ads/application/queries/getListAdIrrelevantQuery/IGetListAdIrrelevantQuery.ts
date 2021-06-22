import { IAdListModel } from '../model/IAdListModel';

export interface IGetListAdIrrelevantQuery {
  execute(): Promise<Readonly<Array<IAdListModel>>>;
}
