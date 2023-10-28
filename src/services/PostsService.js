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
    AppState.posts = res.data.posts.map(pojo => new Post(pojo))
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }

  async likePost(postData,) {

    await api.post(`api/posts/${postData.postId}/like`)
    if (postData.postId)
      logger.log(postData.likeIds)
  }

  async createPost(formData) {
    const res = await api.post('api/posts', formData)
    const post = new Post(res.data)
    const postsAry = AppState.posts
    AppState.posts = [post, ...postsAry]
    logger.log('[postsService] createPost() post created', post)
    Pop.success('Post Created')
  }


  async deletePost(postId) {
    await api.delete(`api/posts/${postId}`)
    const foundPostIndex = AppState.posts.findIndex(post => post.postId == postId)
    logger.log('[postsService] deletePost() deleted post', foundPostIndex)

    AppState.posts.splice(foundPostIndex, 1)

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