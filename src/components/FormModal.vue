<template>
  <div class="modal" tabindex="-1" id="form-modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create A Post</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createPost()">

            <div class="form-floating mb-3">
              <input v-model="editable.imgUrl" type="url" maxlength="500" class="form-control" id="floatingInput"
                placeholder="name@example.com">
              <label for="floatingInput">Image Url</label>
            </div>
            <div class="form-floating">
              <textarea v-model="editable.body" class="form-control" required maxlength="500"
                placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
              <label for="floatingTextarea2">Post Body</label>
            </div>
            <div class="modal-footer">
              <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
              <button type="submit" class="btn btn-outline-dark">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger.js";
import { postsService } from "../services/PostsService";
import { Modal } from "bootstrap";
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      if (AppState.onAccountPage) {
        Pop.success('Welcome to the account page')

      }
    })
    return {
      editable,
      async createPost() {
        try {
          if (!AppState.account) {
            return
          }
          const formData = editable.value
          await postsService.createPost(formData)
          editable.value = {}
          Modal.getOrCreateInstance('#form-modal').hide()
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped></style>