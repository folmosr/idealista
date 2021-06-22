import { Ad } from '../../../domain/Ad';
import { IPictureModel } from '../../queries/model/IPictureModel';

export interface IAdFactory {
  CreateAd(
    id: number,
    typology: Readonly<string>,
    description: Readonly<string>,
    pictures: Readonly<Array<IPictureModel>>,
    houseSize: Readonly<number>,
    score: Readonly<number>,
    gardenSize?: Readonly<number>,
    irrelevantSince?: Readonly<Date>,
  ): Ad;
}
