import { IEntity } from '../../shared/domain/IEntity';

export interface Picture extends IEntity {
  url: Readonly<string>;
  quality: Readonly<string>;
}
