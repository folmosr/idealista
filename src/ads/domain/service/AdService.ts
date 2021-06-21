import { IPictureModel } from '../../application/queries/IPictureModel';
import { AdTypeEnum } from '../enums/AdTypeEnum';
import { wordCounter } from '../util/functions';
import { IAdService } from './IAdService';

export class AdService implements IAdService {
  inspectDescription(description: string, type: string): number {
    if (!description && description.length > 0) {
      return 0;
    }
    let result = Number.parseInt(
      process.env.DESCRIPTION_DEFAULT_POINTS as string,
      10,
    );
    const wordsCount = wordCounter(description);
    if (type == AdTypeEnum.FLAT) {
      if (wordsCount >= 20 && wordsCount <= 49) {
        result += Number.parseInt(
          process.env.FLAT_DESCRIPTION_MIN_POINTS as string,
          10,
        );
      } else if (wordsCount >= 50) {
        result += Number.parseInt(
          process.env.FLAT_DESCRIPTION_MAX_POINTS as string,
          10,
        );
      }
    } else if (type == AdTypeEnum.CHALET) {
      if (wordsCount >= 50) {
        result += Number.parseInt(
          process.env.CHALET_DESCRIPTION_MAX_POINTS as string,
          10,
        );
      }
    }
    return result;
  }

  countPhotos = (pictures: readonly IPictureModel[]) => {
    if (pictures.length === 0) {
      return Number.parseInt(process.env.NO_PHOTO_POINTS as string, 10);
    }

    const photosHD = pictures.filter((picture) => picture.quality === "HD");
    const photosNoHD = pictures.filter((picture) => picture.quality !== "HD");
    const result =
      photosHD.length *
        Number.parseInt(process.env.PHOTO_HD_POINTS as string, 10) +
      photosNoHD.length *
        Number.parseInt(process.env.PHOTO_NO_HD_POINTS as string, 10);
    return result;
  };
}
