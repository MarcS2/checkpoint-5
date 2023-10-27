import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { Post } from "../models/Post"
import Pop from "../utils/Pop";
class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('[PostsService] getPosts() got posts', res.data)
    const posts = res.data.posts.map(pojo => new Post(pojo))
    AppState.posts = posts
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
    logger.log('[AppState] getPosts() posts in AppState', AppState.posts)
  }


  async getPostByCreatorId(creatorId) {
    const res = await api.get(`api/profiles/${creatorId}/posts`)
    logger.log('got posts by creator id, got posts', res.data)
  }

  async likePost(postData,) {

    await api.post(`api/posts/${postData.postId}/like`)
    if (postData.postId)
      logger.log(postData.likeIds)
  }


  async changePage(url) {
    const res = await api.get(url)
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
    const posts = res.data.posts.map(pojo => new Post(pojo))
    AppState.posts = posts
    window.scrollTo(0, 0)
  }
}

export const postsService = new PostsService()