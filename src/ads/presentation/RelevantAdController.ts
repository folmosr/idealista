import { Request, Response } from 'express';
import httpStatus from 'http-status';

import {
    IGetListAdRelevantQuery
} from '../../ads/application/queries/getListAdRelevantQuery/IGetListAdRelevantQuery';
import { IBaseController } from '../../shared/infrastructure/controllers/IBaseController';
import { IAdListModel } from '../application/queries/model/IAdListModel';

export class RelevantAdController implements IBaseController {
  private _queryRepository: IGetListAdRelevantQuery;

  constructor(queryRepository: IGetListAdRelevantQuery) {
    this._queryRepository = queryRepository;
  }
  run = async (req: Request, res: Response): Promise<void> => {
    try {
      const responseList: readonly IAdListModel[] =
        await this._queryRepository.execute();
      res.status(httpStatus.OK).send({ response: responseList });
    } catch (error) {
      log.error("Error crenaod archivo de cálculos", {
        message: error.message,
      });
      res.status(httpStatus.BAD_REQUEST).send(error);
    }
  };
}
