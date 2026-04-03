import { ITile } from '../Levels'

class DataManager {
  mapInfo: ITile[][]
  mapRowCount: number
  mapColumnCount: number
}

export const dataManagerInstance = new DataManager()