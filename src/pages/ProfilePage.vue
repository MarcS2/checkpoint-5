<template>
  <section v-if="profile" class="row  mt-3">
    <div class="col-12 border border-dark border-2 shadow coverBg mx-2 bg-light rounded">
      <section class="row mx-2 ">
        <div class=" col-12 ">

          <img class="cover-img mt-2 rounded shadow pos-rel mb-3 " :src="profile.coverImg" alt="background Image">
        </div>
        <div class="col-6">
          <img class="img-pfp rounded-circle mb-4 d-inline" :src="profile.picture" :alt="profile.name">

        </div>
        <div class="col-6 text-end mt-5">
          <a v-if="profile.github" :href="profile.github" class="text-dark me-2">
            <i class="mdi mdi-github text-end fs-1"></i>
          </a>
          <a v-if="profile.linkedin" :href="profile.linkedin" class="text-dark me-2">
            <i class="mdi mdi-linkedin text-end fs-1"></i>
          </a>
          <a v-if="profile.resume" :href="profile.resume" class="text-dark me-2">
            <i class="mdi mdi-file-account text-end fs-1"></i>
          </a>

        </div>


        <div class="col-12">

          <h1 class="ms-2 d-inline">{{ profile.name }}</h1>
          <i v-if="profile.graduated" class="mdi mdi-account-school ms-5 fs-3 "></i>

        </div>

        <p class="fs-4 ms-4">{{ profile.class }}</p>

        <div class="col-12 ">

          <h2 class="ms-5 me-5">{{ profile.bio }}</h2>
        </div>

      </section>
    </div>
    <!-- SECTION PostsCard template goes here for the active profiles posts -->
    <div v-for="post in posts" :key="post.postId" class="col-12">
      <PostsCardTemplate :postData="post" />
    </div>
    <!-- !SECTION -->
  </section>
  <PaginationComponent :previous="previous" :next="next" />
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, onUnmounted } from 'vue';
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import { profilesService } from "../services/ProfilesService"
export default {
  setup() {
    const route = useRoute()
    const creatorId = route.params.profileId
    onMounted(() => {
      getPostByCreatorId()
      getProfileById()
    })
    onUnmounted(() => {
      profilesService.clearData()
    })
    async function getProfileById() {
      try {
        await profilesService.getProfileById(creatorId)
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getPostByCreatorId() {
      try {
        logger.log('creatorId from params', creatorId)
        await postsService.getPostByCreatorId(creatorId)
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      previous: computed(() => AppState.previousPage),
      next: computed(() => AppState.nextPage),
    }
  }
};
</script>


<style lang="scss" scoped>
.cover-img {
  height: 50vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}




.img-pfp {
  object-fit: cover;
  object-position: center;
  height: 8.5rem;
  width: 8.5rem;
}
</style>