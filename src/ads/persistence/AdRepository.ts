import { json } from 'body-parser';
import fs from 'fs';

import { Repository } from '../../shared/persistence/Repository';
import { IAdRepository } from '../application/interfaces/persistence/IAdRepository';
import { Ad } from '../domain/Ad';

export class AdRepository extends Repository<Ad> implements IAdRepository {
  constructor() {
    super();
  }

  /**
   * Obtiene listado de Ad desde un archivo
   */
  getAllFromFile(): Promise<Ad[]> {
    const fileContents = fs.readFileSync(`./data/ads.json`, "utf-8");
    const elements: Ad[] = <Ad[]>(<unknown>JSON.parse(fileContents));
    return Promise.resolve(elements);
  }

  /**
   * Save processed data to a file
   *
   */
  async saveToFile(docs: readonly Ad[]): Promise<void> {
    return fs.writeFileSync("./data/ads.json", JSON.stringify(docs));
  }

  /**
   * get all Ads from memory
   *
   */
  async getAll(): Promise<Ad[]> {
    const ads: Ad[] = [
      {
        id: 1,
        typology: "CHALET",
        description: "Este piso es una ganga, compra, compra, COMPRA!!!!!",
        pictures: [],
        houseSize: 300,
        score: 0,
      },
      {
        id: 2,
        typology: "FLAT",
        description:
          "Nuevo ático céntrico recién reformado. No deje pasar la oportunidad y adquiera este ático de lujo",
        pictures: [
          { id: 4, url: "https://www.idealista.com/pictures/4", quality: "HD" },
        ],
        houseSize: 300,
        score: 0,
      },
      {
        id: 3,
        typology: "CHALET",
        description: "",
        pictures: [
          { id: 2, url: "https://www.idealista.com/pictures/2", quality: "HD" },
        ],
        houseSize: 300,
        score: 0,
      },
      {
        id: 4,
        typology: "FLAT",
        description:
          "Ático céntrico muy luminoso y recién reformado, parece nuevo",
        pictures: [
          { id: 5, url: "https://www.idealista.com/pictures/5", quality: "SD" },
        ],
        houseSize: 300,
        score: 0,
      },
      {
        id: 5,
        typology: "FLAT",
        description: "Pisazo,",
        pictures: [
          { id: 3, url: "https://www.idealista.com/pictures/3", quality: "SD" },
          { id: 8, url: "https://www.idealista.com/pictures/8", quality: "HD" },
        ],
        houseSize: 300,
        score: 0,
      },
      {
        id: 6,
        typology: "GARAGE",
        description: "",
        pictures: [
          { id: 6, url: "https://www.idealista.com/pictures/6", quality: "SD" },
        ],
        houseSize: 300,
        score: 0,
      },
      {
        id: 7,
        typology: "GARAGE",
        description: "Garaje en el centro de Albacete",
        pictures: [],
        houseSize: 300,
        score: 0,
      },
      {
        id: 8,
        typology: "CHALET",
        description:
          "Maravilloso chalet situado en lAs afueras de un pequeño pueblo rural. El entorno es espectacular, las vistas magníficas. ¡Cómprelo ahora!",
        pictures: [
          { id: 1, url: "https://www.idealista.com/pictures/1", quality: "SD" },
          { id: 7, url: "https://www.idealista.com/pictures/7", quality: "SD" },
        ],
        houseSize: 300,
        score: 0,
      },
    ];
    return Promise.resolve(ads);
  }
}
