import { Request, Response } from 'express';
import httpStatus from 'http-status';

import {
    IGetListAdIrrelevantQuery
} from '../../ads/application/queries/getListAdIrrelevantQuery/IGetListAdIrrelevantQuery';
import { IBaseController } from '../../shared/infrastructure/controllers/IBaseController';
import { IAdListModel } from '../application/queries/model/IAdListModel';

export class IrrelevantAdController implements IBaseController {
  private _queryRepository: IGetListAdIrrelevantQuery;

  constructor(queryRepository: IGetListAdIrrelevantQuery) {
    this._queryRepository = queryRepository;
  }
  run = async (req: Request, res: Response): Promise<void> => {
    try {
      const responseList: readonly IAdListModel[] =
        await this._queryRepository.execute();
      res.status(httpStatus.OK).send({ response: responseList });
    } catch (error) {
      log.error(
        "Error obteniendo listado (asegúrese de haber realizado los cálculos)",
        {
          message: error.message,
        },
      );
      res.status(httpStatus.BAD_REQUEST).send(error);
    }
  };
}
