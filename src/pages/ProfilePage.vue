<template>
  <section v-if="profile" class="row ms-3 mt-3">
    <div class="col-12 border border-dark border-2 shadow coverBg">
      <section class="row mx-2">
        <div class=" col-12 ">

          <div>
            <img class="cover-img mt-2 rounded shadow pos-rel mb-3" :src="profile.coverImg" alt="background Image">
          </div>
          <img class="img-pfp rounded-circle mb-4 " :src="profile.picture" :alt="profile.name">
          <h1 class="ms-2">{{ profile.name }}</h1>
          <i v-if="profile.graduated" class="mdi mdi-account-school ms-5 fs-3"></i>
          <p class="fs-4 ms-4">{{ profile.class }}</p>
        </div>
        <div class="col-12 ">
          <h2>{{ profile.bio }}</h2>
        </div>

      </section>
    </div>
    <!-- SECTION PostsCard template goes here for the active profiles posts -->
    <div class="col-12">

    </div>
    <!-- !SECTION -->
  </section>
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
      url: `${this?.profile.coverImg}`
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