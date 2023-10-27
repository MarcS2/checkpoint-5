import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { Ad } from "../models/Ad"
class AdsService {
  async getAds() {
    const res = await api.get('api/ads')
    AppState.ads = res.data.map(pojo => new Ad(pojo))
    logger.log('[AppState] getAds() ads in appstate', AppState.ads)
  }
}

export const adsService = new AdsService()