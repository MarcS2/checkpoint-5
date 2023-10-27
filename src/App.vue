<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">
      <section class="row">

        <!-- SECTION Router View -->

        <div class="col-9">
          <router-view />

        </div>

        <!-- !SECTION -->

        <!-- SECTION ads -->

        <div class="col-3">
          <section class="row mt-3">
            <div v-for="ad in ads" :key="ad.title" class="col-12">
              <AdHandler :ad="ad" />
            </div>
          </section>
        </div>

        <!-- !SECTION -->
      </section>
    </div>
  </main>
  <footer>
  </footer>
</template>

<script>
import { onMounted } from "vue"
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Pop from "./utils/Pop"
import { adsService } from "../src/services/AdsService"
import AdHandler from "./components/adHandler.vue"

export default {
  setup() {
    onMounted(() =>
      getAds()
    )
    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads)
    }
  },
  components: { Navbar, AdHandler }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
