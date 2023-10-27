<template>
  <section class="row ms-3 mt-2">
    <div class="col-12 d-flex justify-content-between">
      <button @click="changePage(previous)" :disabled="!previous" class="btn btn-outline-dark text-start">
        Previous
      </button>
      <button @click="changePage(next)" :disabled="!next" class="btn btn-outline-dark text-end ">
        Next
      </button>
    </div>
  </section>
</template>


<script>
import { stringifyQuery } from "vue-router";
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  props: {
    previous: { required: true },
    next: { required: true }

  },
  setup() {
    return {

      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped></style>