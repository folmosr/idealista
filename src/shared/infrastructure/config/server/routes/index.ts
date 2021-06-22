import { Router } from 'express';

import { AdFacade } from '../../../../../ads/application/commands/facades/AdFacade';
import { IAdFacade } from '../../../../../ads/application/commands/facades/IAdFacade';
import { AdFactory } from '../../../../../ads/application/commands/factory/AdFactory';
import { IAdFactory } from '../../../../../ads/application/commands/factory/IAdFactory';
import { IAdRepository } from '../../../../../ads/application/interfaces/persistence/IAdRepository';
import {
    GetListAdQuery
} from '../../../../../ads/application/queries/getListAdQuery/GetListAdQuery';
import {
    IGetListAdQuery
} from '../../../../../ads/application/queries/getListAdQuery/IGetListAdQuery';
import {
    GetListAdRelevantQuery
} from '../../../../../ads/application/queries/getListAdRelevantQuery/GetListAdRelevantQuery';
import {
    IGetListAdRelevantQuery
} from '../../../../../ads/application/queries/getListAdRelevantQuery/IGetListAdRelevantQuery';
import { AdService } from '../../../../../ads/domain/service/AdService';
import { IAdService } from '../../../../../ads/domain/service/IAdService';
import { AdRepository } from '../../../../../ads/persistence/AdRepository';
import { AdCalcullationController } from '../../../../../ads/presentation/AdCalculationController';
import { RelevantAdController } from '../../../../../ads/presentation/RelevantAdController';
import { VersionHealth } from '../../../../../version';

export class Routes {
  public router: Router;
  private versionHealth: VersionHealth;

  //#region repository
  private readonly _respository: IAdRepository = new AdRepository();
  //#endregion

  //#region querys
  private readonly _getListAdsQuery: IGetListAdQuery = new GetListAdQuery(
    this._respository,
  );
  private readonly _getListRelevantAdsQuery: IGetListAdRelevantQuery =
    new GetListAdRelevantQuery(this._respository);
  //#endregion

  //#region others
  private readonly _adFactory: IAdFactory = new AdFactory();
  private readonly _adService: IAdService = new AdService();
  private readonly _adFacade: IAdFacade = new AdFacade(
    this._getListAdsQuery,
    this._adService,
    this._respository,
    this._adFactory,
  );
  //#endregion

  //#region  controllers
  private readonly _adCalculationController: AdCalcullationController;
  private readonly _relevantAdController: RelevantAdController;
  //#endregion

  constructor() {
    this.router = Router();
    this.versionHealth = new VersionHealth();
    this._adCalculationController = new AdCalcullationController(
      this._adFacade,
    );
    this._relevantAdController = new RelevantAdController(
      this._getListRelevantAdsQuery,
    );
  }

  public routes(): Router {
    this.router.get("/version", this.versionHealth.run);
    this.router.get("/calculation", this._adCalculationController.run);
    this.router.get("/relevants", this._relevantAdController.run);
    return this.router;
  }
}
