import { Request, Response } from 'express';
import httpStatus from 'http-status';

import {
    IGetListSortedAdQuery
} from '../../ads/application/queries/getListSortedQuery/IGetListSortedAdQuery';
import { IBaseController } from '../../shared/infrastructure/controllers/IBaseController';
import { IAdListModel } from '../application/queries/model/IAdListModel';

export class SortedAdController implements IBaseController {
  private _queryRepository: IGetListSortedAdQuery;

  constructor(queryRepository: IGetListSortedAdQuery) {
    this._queryRepository = queryRepository;
  }
  run = async (req: Request, res: Response): Promise<void> => {
    try {
      const responseList: readonly IAdListModel[] =
        await this._queryRepository.execute();
      res.status(httpStatus.OK).send({ response: responseList });
    } catch (error) {
      log.error("Error obteniendo listado", {
        message: error.message,
      });
      res.status(httpStatus.BAD_REQUEST).send(error);
    }
  };
}
