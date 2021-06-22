import { Ad } from '../../../domain/Ad';
import { Picture } from '../../../domain/Picture';
import { IPictureModel } from '../../queries/model/IPictureModel';
import { IAdFactory } from './IAdFactory';

export class AdFactory implements IAdFactory {
  CreateAd(
    id: number,
    typology: string,
    description: string,
    picturesModel: Readonly<Array<IPictureModel>>,
    houseSize: number,
    score: number,
    gardenSize?: number,
    irrelevantSince?: Readonly<Date>,
  ): Ad {
    const pictures: Picture[] = picturesModel.map(
      (item, index) =>
        ({ id: index + 1, url: item.url, quality: item.quality } as Picture),
    );
    return {
      id,
      typology,
      description,
      pictures,
      houseSize,
      score,
      gardenSize: gardenSize ?? 0,
      irrelevantSince,
    } as Ad;
  }
}
