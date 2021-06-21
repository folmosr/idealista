import { IEntity } from '../../shared/domain/IEntity';
import { Picture } from './Picture';

export interface Ad extends IEntity {
  typology: Readonly<string>;
  description: Readonly<string>;
  pictures: Readonly<Array<Picture>>;
  houseSize: Readonly<number>;
  gardenSize?: Readonly<number>;
  score: Readonly<number>;
  irrelevantSince?: Readonly<Date>;
}
