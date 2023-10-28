<template>
  <!-- TODO make form component -->
  <section class="row ">
    <div v-for="post in posts" :key="post.postId" class="col-12 ">
      <PostsCardTemplate :postData="post" />
    </div>
  </section>
  <PaginationComponent :previous="previous" :next="next" />
</template>

<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService"
import { AppState } from "../AppState"
import PaginationComponent from "../components/PaginationComponent.vue";

export default {
  setup() {
    onMounted(() => {
      getPosts();
    });
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    return {
      posts: computed(() => AppState.posts),
      previous: computed(() => AppState.previousPage),
      next: computed(() => AppState.nextPage)
    };
  },
  components: { PaginationComponent }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;


    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
