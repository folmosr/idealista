import { IAdFacade } from 'ads/application/commands/facades/IAdFacade';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { IBaseController } from '../../shared/infrastructure/controllers/IBaseController';

export class AdCalcullationController implements IBaseController {
  private readonly _adFacade: IAdFacade;

  constructor(adFacade: IAdFacade) {
    this._adFacade = adFacade;
  }

  run = async (req: Request, res: Response): Promise<void> => {
    try {
      await this._adFacade.doCalculation();
      res.status(httpStatus.OK).send({ response: `Ok` });
    } catch (error) {
      log.error("Error crenaod archivo de cálculos", {
        message: error.message,
      });
      res.status(httpStatus.BAD_REQUEST).send(error);
    }
  };
}
