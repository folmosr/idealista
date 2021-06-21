import { Router } from 'express';

import { IAdRepository } from '../../../../../ads/application/interfaces/persistence/IAdRepository';
import { GetListAdQuery } from '../../../../../ads/application/queries/GetListAdQuery';
import { IGetListAdQuery } from '../../../../../ads/application/queries/IGetListAdQuery';
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
  private readonly _adCalculationController: AdCalcullationController;
  private readonly _getListAdQuery: IGetListAdQuery = new GetListAdQuery(
    this._respository,
  );

  constructor() {
    this.router = Router();
    this.versionHealth = new VersionHealth();
    this._adCalculationController = new AdCalcullationController(
      this._getListAdQuery,
    );
  }

  public routes(): Router {
    this.router.get('/version', this.versionHealth.run);
    this.router.get('/calculation', this._adCalculationController.run);
    return this.router;
  }
}
