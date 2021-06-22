import { IAdService } from '../../../domain/service/IAdService';
import { IGetListAdQuery } from '../../queries/IGetListAdQuery';

export interface IAdFacade {
  doCalculation(): Promise<void>;
}
