import fs from 'fs';

import { IAdService } from '../../domain/service/IAdService';
import { IGetListAdQuery } from '../queries/IGetListAdQuery';
import { IAdFacade } from './IAdFacade';

export class AdFacade implements IAdFacade {
  private _queryRepository: IGetListAdQuery;
  private _service: IAdService;

  constructor(queryRepository: IGetListAdQuery, service: IAdService) {
    this._queryRepository = queryRepository;
    this._service = service;
  }

  async doCalculation(): Promise<void> {
    const ads = await this._queryRepository.execute();
    log.info(`Listado de Ads que pasan a la etapa de cálculo`, {
      message: JSON.stringify(ads),
    });

    for (let item of ads) {
      let score = 0;
      score += this._service.countPhotos(item.pictures);
      score += this._service.inspectDescription(
        item.description,
        item.typology,
      );
      score += this._service.isCompleted(
        item.typology,
        item.description,
        item.gardenSize ?? 0,
        item.houseSize,
        item.pictures.length,
      );
      item.score = score;
    }
    return fs.writeFileSync("data/ads.json", JSON.stringify(ads));
  }
}
