<template>
  <div class="component">


  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      getPostByCreatorId()
    })
    async function getPostByCreatorId() {
      try {
        const creatorId = route.params.profileId
        logger.log('creatorId from params', creatorId)
        await postsService.getPostByCreatorId(creatorId)
      } catch (error) {
        Pop.error(error)
      }
    }
    return {}
  }
};
</script>


<style lang="scss" scoped></style>