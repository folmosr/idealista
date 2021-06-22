import { Ad } from '../../../domain/Ad';
import { IAdRepository } from '../../interfaces/persistence/IAdRepository';
import { IAdListModel } from '../model/IAdListModel';
import { IGetListSortedAdQuery } from './IGetListSortedAdQuery';

export class GetListSortedAdQuery implements IGetListSortedAdQuery {
  private _repository: IAdRepository;
  constructor(repository: IAdRepository) {
    this._repository = repository;
  }

  async execute(): Promise<readonly IAdListModel[]> {
    const ads = await this._repository.getAllFromFile();
    return ads
      .sort((a, b) => {
        if (a.score > b.score) {
          return -1;
        }
        if (a.score > b.score) {
          return 1;
        }
        return 0;
      })
      .map((doc: Ad) => {
        const model: IAdListModel = {
          description: doc.description,
          gardenSize: doc.gardenSize ?? 0,
          pictures: doc.pictures.map((picture) => ({
            url: picture.url,
            quality: picture.quality,
          })),
          typology: doc.typology,
          houseSize: doc.houseSize,
          score: doc.score,
          irrelevantSince: doc.irrelevantSince,
        };
        return model;
      });
  }
}
