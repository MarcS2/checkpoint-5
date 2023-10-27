export class Post {
  constructor(data) {
    this.postId = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.likeIds = data.likeIds
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}