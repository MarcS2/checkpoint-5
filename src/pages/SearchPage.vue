<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">

        <form @submit.prevent="getPostsByQuery(editable.query)" class="row align-items-center">
          <div class="col-11">
            <div class="mb-3 mt-4">
              <input v-model="editable.query" type="text" placeholder="Search" class="form-control"
                id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
          </div>
          <div class="col-1">
            <button class="btn btn-outline-dark " type="submit"><i class="mdi mdi-magnify text-light "></i></button>

          </div>
        </form>
      </div>
      <div v-for="post in posts" :key="post.postId" class="col-12">
        <PostsCardTemplate :postData="post" />

      </div>
    </section>
  </div>
</template>


<script>
import { ref } from "vue";
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import PostsCardTemplate from "../components/PostsCardTemplate.vue";
import { postsService } from "../services/PostsService"
import Pop from "../utils/Pop";
export default {

  setup() {

    const editable = ref({});
    return {
      editable,
      posts: computed(() => AppState.posts),


      async getPostsByQuery() {

        try {
          await postsService.getPostsByQuery(editable.value.query)

        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { PostsCardTemplate }
};
</script>


<style lang="scss" scoped></style>