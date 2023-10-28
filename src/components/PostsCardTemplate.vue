<template>
  <section class="row ms-3 mt-3 border border-dark border-2 shadow bg-light rounded ">
    <div class="col-12">
      <router-link :to="{ name: 'Profile', params: { profileId: postData.creator.id } }">
        <img class="rounded-circle img-pfp mt-2 ms-3 " :src="postData.creator.picture" :alt="postData.creator.name">
      </router-link>
      <p class="d-inline ms-2 fs-4">{{ postData.creator.name }}</p>
      <p class="fs-6 d-inline ms-3">{{ postData.createdAt.toLocaleString() }}</p>
      <i v-if="postData.creator.graduated" class="mdi mdi-account-school ms-2"></i>
    </div>
    <div v-if="postData.imgUrl" class="col-12">
      <img :src="postData.imgUrl" class="img-post p-2 px-3" alt="">
    </div>
    <p class="ms-3 fs-5">{{ postData.body }}</p>
    <div class="text-end">
      <button @click="likePost(postData,)" class="btn mb-2 ">
        <!-- TODO get button switching based off if post liked or not -->
        <!-- <i class="mdi mdi-heart-outline"></i> -->
        <i class="mdi mdi-heart"></i>
      </button>

    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from "../models/Post";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  props: {
    postData: { type: Post, required: true }
  },
  setup() {
    return {

      account: computed(() => AppState.account),
      async likePost(postData,) {
        try {
          if (!this.account) {
            Pop.error('You must be logged in to like a post.')
            return
          }


          await postsService.likePost(postData,)
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