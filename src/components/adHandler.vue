<template>
  <div class="mb-3 text-center">
    <a href="https://boisecodeworks.com/" class="ms-4 ">
      <img class="img-fluid" :src="ad.imgUrl" :alt="ad.title">

    </a>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Ad } from "../models/Ad";
export default {
  props: {
    ad: { type: Ad, required: true }
  },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped></style>