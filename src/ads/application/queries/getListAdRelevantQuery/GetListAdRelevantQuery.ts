import { Ad } from '../../../domain/Ad';
import { IAdRepository } from '../../interfaces/persistence/IAdRepository';
import { IAdListModel } from '../model/IAdListModel';
import { IGetListAdRelevantQuery } from './IGetListAdRelevantQuery';

export class GetListAdRelevantQuery implements IGetListAdRelevantQuery {
  private _repository: IAdRepository;
  constructor(repository: IAdRepository) {
    this._repository = repository;
  }

  async execute(): Promise<readonly IAdListModel[]> {
    const ads = await this._repository.getAllFromFile();
    return ads
      .filter((item) => item.score > 40)
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
