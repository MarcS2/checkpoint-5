import { AppState } from "../AppState"
import { Profile } from "../models/Profile"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {
  async getProfileById(creatorId) {
    const res = await api.get(`api/profiles/${creatorId}`)
    AppState.profile = new Profile(res.data)
    logger.log('got profile by id', res.data)
  }

  clearData() {
    AppState.profile = null
    AppState.nextPage = null
    AppState.previousPage = null
  }
}

export const profilesService = new ProfilesService()