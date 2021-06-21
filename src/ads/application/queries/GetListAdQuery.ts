import { Ad } from '../../domain/Ad';
import { IAdRepository } from '../interfaces/persistence/IAdRepository';
import { IAdListModel } from './IAdListModel';
import { IGetListAdQuery } from './IGetListAdQuery';

export class GetListAdQuery implements IGetListAdQuery {
  private _repository: IAdRepository;
  constructor(repository: IAdRepository) {
    this._repository = repository;
  }

  async Execute(): Promise<readonly IAdListModel[]> {
    const ads = await this._repository.getAll();
    return ads.map((doc: Ad) => {
      const model: IAdListModel = {
        description: doc.description,
        gardenSize: doc.gardenSize ?? 0,
        pictures: doc.pictures.flatMap((picture) => {
          return !Array.isArray(picture)
            ? { url: picture.url, quality: picture.quality }
            : [
                ...picture.map((item) => ({
                  url: item.url,
                  quality: item.quality,
                })),
              ];
        }),
        typology: doc.typology,
        houseSize: doc.houseSize,
        score: doc.score,
        irrelevantSince: doc.irrelevantSince,
      };
      return model;
    });
  }
}
