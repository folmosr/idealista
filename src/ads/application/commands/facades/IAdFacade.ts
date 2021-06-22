import { IAdService } from '../../../domain/service/IAdService';
import { IGetListAdQuery } from '../../queries/getListAdQuery/IGetListAdQuery';

export interface IAdFacade {
  doCalculation(): Promise<void>;
}
