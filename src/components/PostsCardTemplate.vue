<template>
  <section class="row ms-3 mt-3 border border-dark border-2 shadow  ">
    <div class="col-12">
      <img class="rounded-circle img-pfp mt-2 ms-3 " :src="postData.creator.picture" :alt="postData.creator.name">
      <p class="d-inline ms-2 fs-4">{{ postData.creator.name }}</p>
      <p class="fs-6 d-inline ms-3">{{ postData.createdAt.toLocaleString() }}</p>
      <i v-if="postData.creator.graduated" class="mdi mdi-account-school ms-2"></i>
    </div>
    <div v-if="postData.imgUrl" class="col-12">
      <img :src="postData.imgUrl" class="img-post p-2 px-3" alt="">
    </div>
    <p class="ms-3">{{ postData.body }}</p>
    <div class="text-end">
      <button @click="likePost()" class="btn mb-2 ">
        <!-- TODO get button switching based off if post liked or not -->
        <!-- <i  class="mdi mdi-heart-outline"></i> -->
        <i class="mdi mdi-heart"></i>
      </button>

    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from "../models/Post";
export default {
  props: {
    postData: { type: Post, required: true }
  },
  setup() {
    return {
      async likePost() {

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