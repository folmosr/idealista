import { IPictureModel } from './IPictureModel';

export interface IAdListModel {
  typology: Readonly<string>;
  description: Readonly<string>;
  pictures: Readonly<Array<IPictureModel>>;
  houseSize: Readonly<number>;
  gardenSize?: Readonly<number>;
  score: Readonly<number>;
  irrelevantSince?: Readonly<Date>;
}
