import { Console } from 'console';

import { IPictureModel } from '../../application/queries/model/IPictureModel';
import { AdTypeEnum } from '../enums/AdTypeEnum';
import { wordCounter } from '../util/functions';
import { IAdService } from './IAdService';

export class AdService implements IAdService {
  isCompleted(
    type: string,
    description: string,
    gardenSize: number,
    houseSize: number,
    pictureslength: number,
  ): number {
    let result = 0;
    const { count } = wordCounter(description ?? "");
    if (type === AdTypeEnum.FLAT) {
      if (pictureslength > 0 && houseSize > 0 && count > 0) {
        result = Number.parseInt(process.env.AD_COMPLETED_POINTS as string, 10);
      }
    }
    if (type === AdTypeEnum.CHALET) {
      if (pictureslength > 0 && houseSize > 0 && count > 0 && gardenSize > 0) {
        result = Number.parseInt(process.env.AD_COMPLETED_POINTS as string, 10);
      }
    }
    if (type === AdTypeEnum.GARAGE) {
      if (pictureslength > 0 && houseSize > 0) {
        result = Number.parseInt(process.env.AD_COMPLETED_POINTS as string, 10);
      }
    }
    return result;
  }
  inspectDescription(description: string, type: string): number {
    const wordsCount = wordCounter(description ?? "");
    const keyWords = (process.env.KEY_WORDS as string).split(",");

    if (!(wordsCount.count > 0)) {
      return 0;
    }
    /**
     * by default
     */
    let result = Number.parseInt(
      process.env.DESCRIPTION_DEFAULT_POINTS as string,
      10,
    );

    /**
     * checking typology
     */
    if (type == AdTypeEnum.FLAT) {
      if (wordsCount.count >= 20 && wordsCount.count <= 49) {
        result += Number.parseInt(
          process.env.FLAT_DESCRIPTION_MIN_POINTS as string,
          10,
        );
      } else if (wordsCount.count >= 50) {
        result += Number.parseInt(
          process.env.FLAT_DESCRIPTION_MAX_POINTS as string,
          10,
        );
      }
    }
    if (type == AdTypeEnum.CHALET) {
      if (wordsCount.count >= 50) {
        result += Number.parseInt(
          process.env.CHALET_DESCRIPTION_MAX_POINTS as string,
          10,
        );
      }
    }

    /**
     * checking key words
     */
    wordsCount.words.forEach((element) => {
      let upper = element.toUpperCase();
      if (keyWords.includes(upper)) {
        result += Number.parseInt(
          process.env.INCLUDE_KEYWORD_POINTS as string,
          10,
        );
      }
    });

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
