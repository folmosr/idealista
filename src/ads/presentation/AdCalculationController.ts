import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { IBaseController } from '../../shared/infrastructure/controllers/IBaseController';
import { IGetListAdQuery } from '../application/queries/IGetListAdQuery';

export class AdCalcullationController implements IBaseController {
  private readonly _getListAds: IGetListAdQuery;

  constructor(getListAds: IGetListAdQuery) {
    this._getListAds = getListAds;
  }

  run = async (req: Request, res: Response): Promise<void> => {
    try {
      const ads = await this._getListAds.Execute();
      log.info(
        `Listado de Ads que pasan a la etapa de cálculo`,
        Object.assign({}, { message: JSON.stringify(ads) }),
      );
      res.status(httpStatus.OK).send(ads);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error);
    }
  };
}
