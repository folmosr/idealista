import { Ad } from '../../../domain/Ad';
import { IAdService } from '../../../domain/service/IAdService';
import { IAdRepository } from '../../interfaces/persistence/IAdRepository';
import { IGetListAdQuery } from '../../queries/IGetListAdQuery';
import { IAdFactory } from '../factory/IAdFactory';
import { IAdFacade } from './IAdFacade';

export class AdFacade implements IAdFacade {
  private _queryRepository: IGetListAdQuery;
  private _service: IAdService;
  private _adRespository: IAdRepository;
  private _adFacitory: IAdFactory;

  constructor(
    queryRepository: IGetListAdQuery,
    service: IAdService,
    adRepository: IAdRepository,
    adFactory: IAdFactory,
  ) {
    this._queryRepository = queryRepository;
    this._service = service;
    this._adRespository = adRepository;
    this._adFacitory = adFactory;
  }

  async doCalculation(): Promise<void> {
    let adResult: Ad[] = [];
    const ads = await this._queryRepository.execute();
    log.info(`Listado de Ads que pasan a la etapa de cálculo`, {
      message: JSON.stringify(ads),
    });
    let index: number = 0;
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

      adResult = [
        ...adResult,
        this._adFacitory.CreateAd(
          index + 1,
          item.typology,
          item.description,
          item.pictures,
          item.houseSize,
          score,
          item.gardenSize,
          score <= 0 ? new Date() : undefined,
        ),
      ];
      index++;
    }
    return this._adRespository.saveToFile(adResult);
  }
}
