import { Router } from 'express';

import { AdFacade } from '../../../../../ads/application/commands/facades/AdFacade';
import { IAdFacade } from '../../../../../ads/application/commands/facades/IAdFacade';
import { AdFactory } from '../../../../../ads/application/commands/factory/AdFactory';
import { IAdFactory } from '../../../../../ads/application/commands/factory/IAdFactory';
import { IAdRepository } from '../../../../../ads/application/interfaces/persistence/IAdRepository';
import {
    GetListAdIrrelevantQuery
} from '../../../../../ads/application/queries/getListAdIrrelevantQuery/GetListAdRelevantQuery';
import {
    IGetListAdIrrelevantQuery
} from '../../../../../ads/application/queries/getListAdIrrelevantQuery/IGetListAdIrrelevantQuery';
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
import {
    GetListSortedAdQuery
} from '../../../../../ads/application/queries/getListSortedQuery/GetListSortedAdQuery';
import {
    IGetListSortedAdQuery
} from '../../../../../ads/application/queries/getListSortedQuery/IGetListSortedAdQuery';
import { AdService } from '../../../../../ads/domain/service/AdService';
import { IAdService } from '../../../../../ads/domain/service/IAdService';
import { AdRepository } from '../../../../../ads/persistence/AdRepository';
import { AdCalcullationController } from '../../../../../ads/presentation/AdCalculationController';
import { IrrelevantAdController } from '../../../../../ads/presentation/IrrelevantAdController';
import { RelevantAdController } from '../../../../../ads/presentation/RelevantAdController';
import { SortedAdController } from '../../../../../ads/presentation/SortedAdController';
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
  private readonly _getListSortedAdsQuery: IGetListSortedAdQuery =
    new GetListSortedAdQuery(this._respository);
  private readonly _getListIrrelevantAdsQuery: IGetListAdIrrelevantQuery =
    new GetListAdIrrelevantQuery(this._respository);
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
  private readonly _irrelevantAdController: IrrelevantAdController;
  private readonly _sortedAdController: SortedAdController;
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
    this._sortedAdController = new SortedAdController(
      this._getListSortedAdsQuery,
    );
    this._irrelevantAdController = new IrrelevantAdController(
      this._getListIrrelevantAdsQuery,
    );
  }

  public routes(): Router {
    this.router.get("/version", this.versionHealth.run);
    this.router.get("/calculation", this._adCalculationController.run);
    this.router.get("/relevants", this._relevantAdController.run);
    this.router.get("/sorted", this._sortedAdController.run);
    this.router.get("/irrelevants", this._irrelevantAdController.run);
    return this.router;
  }
}
