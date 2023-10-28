<template>
  <section class="row ms-3 mt-3 border border-dark border-2 shadow bg-light rounded ">
    <div class="col-6">
      <router-link :to="{ name: 'Profile', params: { profileId: postData.creator.id } }">
        <img class="rounded-circle img-pfp mt-2 ms-3 " :src="postData.creator.picture" :alt="postData.creator.name">
      </router-link>
      <p class="d-inline ms-2 fs-4">{{ postData.creator.name }}</p>
      <p class="fs-6 d-inline ms-3">{{ postData.createdAt.toLocaleString() }}</p>
      <i v-if="postData.creator.graduated" class="mdi mdi-account-school ms-2 d-inline"></i>
    </div>

    <div v-if="account?.id == postData.creatorId" class="col-6 text-end">

      <button @click="deletePost(postData.postId)" class="btn btn-outline-danger mt-3 me-4" title="Delete Post"><i
          class="mdi mdi-delete"></i></button>


    </div>
    <div v-else class="col-6"></div>
    <div v-if="postData.imgUrl" class="col-12">
      <img :src="postData.imgUrl" class="img-post p-2 px-3" alt="">
    </div>
    <p class="ms-3 fs-5">{{ postData.body }}</p>
    <div v-if="account" class="text-end">
      <button @click="likePost(postData)" class="btn mb-2 ">
        <!-- TODO get button switching based off if post liked or not -->
        <!-- <i v-if="liked.value" class="mdi mdi-heart"></i>
        <i v-else class="mdi mdi-heart-outline"></i> -->
      </button>

    </div>
  </section>
</template>


<script>
import { ref } from "vue";
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from "../models/Post";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  props: {
    postData: { type: Post, required: true }
  },
  setup(props) {
    const liked = ref(this.isLiked(props.postData, this.account.id));

    return {
      // liked,
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),

      // isLiked(postData, creatorId) {
      //   let liked = false;
      //   postData.likeIds.forEach(likeId => {
      //     if (likeId == creatorId) {
      //       liked = true;
      //       return
      //     }
      //   })
      //   return liked
      // },

      async likePost(postData,) {
        try {
          if (!this.account) {
            Pop.error('You must be logged in to like a post.')
            return
          }
          await postsService.likePost(postData,)
          Pop.success('button Clicked')
          if (this.isLiked(postData, this.account.id)) {
            liked.value = false
            Pop.success('Disliked Post')
          } else if (!this.isLiked(postData, this.account.id)) {
            liked.value = true
            Pop.success('Post Liked')
          }
        } catch (error) {
          Pop.error(error)
        }
      },
      async deletePost(postId) {
        try {
          const wantsToDelete = await Pop.confirm('Are you sure you want to delete this post?')
          if (!wantsToDelete) {
            return
          }
          await postsService.deletePost(postId)
          Pop.success('Your post has been deleted')
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
};
</script>


<style lang="scss" scoped>
.img-pfp {
  object-fit: cover;
  object-position: center;
  height: 3.5rem;
  width: 3.5rem;
}

.img-post {
  padding-left: 5rem;
  padding-right: 5rem;

  height: 65vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>