import { Router } from 'express';

import { AdFacade } from '../../../../../ads/application/commands/facades/AdFacade';
import { IAdFacade } from '../../../../../ads/application/commands/facades/IAdFacade';
import { AdFactory } from '../../../../../ads/application/commands/factory/AdFactory';
import { IAdFactory } from '../../../../../ads/application/commands/factory/IAdFactory';
import { IAdRepository } from '../../../../../ads/application/interfaces/persistence/IAdRepository';
import { GetListAdQuery } from '../../../../../ads/application/queries/GetListAdQuery';
import { IGetListAdQuery } from '../../../../../ads/application/queries/IGetListAdQuery';
import { AdService } from '../../../../../ads/domain/service/AdService';
import { IAdService } from '../../../../../ads/domain/service/IAdService';
import { AdRepository } from '../../../../../ads/persistence/AdRepository';
import { AdCalcullationController } from '../../../../../ads/presentation/AdCalculationController';
import { VersionHealth } from '../../../../../version';

export class Routes {
  public router: Router;
  private versionHealth: VersionHealth;

  /**
   * Calculation
   */
  private readonly _respository: IAdRepository = new AdRepository();
  private readonly _getListAdsQuery: IGetListAdQuery = new GetListAdQuery(
    this._respository,
  );
  private readonly _adFactory: IAdFactory = new AdFactory();
  private readonly _adService: IAdService = new AdService();
  private readonly _adCalculationController: AdCalcullationController;
  private readonly _adFacade: IAdFacade = new AdFacade(
    this._getListAdsQuery,
    this._adService,
    this._respository,
    this._adFactory,
  );

  constructor() {
    this.router = Router();
    this.versionHealth = new VersionHealth();
    this._adCalculationController = new AdCalcullationController(
      this._adFacade,
    );
  }

  public routes(): Router {
    this.router.get("/version", this.versionHealth.run);
    this.router.get("/calculation", this._adCalculationController.run);
    return this.router;
  }
}
