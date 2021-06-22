import { IPictureModel } from '../../application/queries/model/IPictureModel';

export interface IAdService {
  /**
   *
   * @param pictures cuenta las fotos de un anuncio según su calidad
   */
  countPhotos(pictures: readonly IPictureModel[]): number;
  /**
   * dadas las consideraciones (se detallan a continuación) sobre ladescripción
   * de un anuncio se retorna la puntación acordada
   * (basada en dichas consideraciones)
   * @param description descripción del anuncio
   * @param type tipo de anuncio
   */
  inspectDescription(description: string, type: string): number;
  /**
   * Verifica si el anuncio está completo basado en la tipología
   * @param type
   * @param description
   * @param gardenSize
   * @param houseSize
   * @param pictureslength
   */
  isCompleted(
    type: string,
    description: string,
    gardenSize: number,
    houseSize: number,
    pictureslength: number,
  ): number;
}
